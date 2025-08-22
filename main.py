from fastapi import FastAPI, WebSocket, WebSocketDisconnect, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import os
import asyncio

try:
    import httpx
except Exception:  # pragma: no cover
    httpx = None  # type: ignore

app = FastAPI()

# Enable CORS for your React app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # replace "*" with your React app URL in production
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------- Data Schemas -----------------
class InvoiceData(BaseModel):
    invoice_id: str
    date: str
    customer: dict
    items: list

class InvoiceLine(BaseModel):
    id: Optional[str] = None
    description: Optional[str] = None
    quantity: Optional[float] = 0
    unitPrice: Optional[float] = 0
    total: Optional[float] = 0

class Invoice(BaseModel):
    id: str
    supplierName: Optional[str] = ""
    supplierVat: Optional[str] = ""
    invoiceNumber: Optional[str] = ""
    date: str
    currency: str = "TND"
    subtotal: float = 0
    tax: float = 0
    total: float = 0
    lines: List[InvoiceLine] = []

# ----------------- WebSocket Manager -----------------
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            await connection.send_json(message)

manager = ConnectionManager()

# ----------------- WebSocket Endpoint -----------------
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()  # keep connection alive
    except WebSocketDisconnect:
        manager.disconnect(websocket)

# ----------------- In-memory Stores -----------------
_invoices: Dict[str, Dict[str, Any]] = {}
_last_extraction: Optional[Dict[str, Any]] = None

# ----------------- Helper Functions -----------------
def _mock_invoice() -> Dict[str, Any]:
    subtotal = 2 * 100 + 1 * 250
    tax = round(subtotal * 0.19, 2)
    return {
        "id": "demo",
        "supplierName": "ACME SARL",
        "supplierVat": "TN1234567",
        "invoiceNumber": "FAC-2025-001",
        "date": "2025-06-30T00:00:00.000Z",
        "currency": "TND",
        "subtotal": subtotal,
        "tax": tax,
        "total": round(subtotal + tax, 2),
        "lines": [
            {"id": "l1", "description": "Service comptable", "quantity": 2, "unitPrice": 100, "total": 200},
            {"id": "l2", "description": "Licence logiciel", "quantity": 1, "unitPrice": 250, "total": 250},
        ],
    }

# ----------------- Webhook from n8n -----------------
@app.post("/webhook")
async def receive_data(data: InvoiceData):
    print("Received from n8n:", data)
    await manager.broadcast(data.dict())  # send to all connected React clients
    return {"status": "success"}

# ----------------- Upload PDF from React -----------------
@app.post("/upload-invoice")
async def upload_invoice(file: UploadFile = File(...)):
    """Receives PDF upload from React and optionally forwards to n8n"""
    global _last_extraction  # ✅ declare global first

    n8n_url = os.getenv("N8N_UPLOAD_URL")
    content = await file.read()

    if n8n_url:
        if httpx is None:
            raise HTTPException(status_code=500, detail="httpx not installed on server")
        try:
            async with httpx.AsyncClient(timeout=60) as client:
                resp = await client.post(
                    n8n_url,
                    files={"file": (file.filename, content, file.content_type or "application/pdf")},
                    data={"source": "fastapi", "via": "upload-invoice"},
                )
            if resp.headers.get("content-type", "").startswith("application/json"):
                data = resp.json()
            else:
                data = {"raw": resp.text}
            _last_extraction = data
            return JSONResponse(data)
        except httpx.HTTPError as e:  # type: ignore
            raise HTTPException(status_code=502, detail=f"n8n forward failed: {e}")

    # Fallback mock
    data = _mock_invoice()
    _last_extraction = data
    return JSONResponse(data)

# ----------------- Endpoints to fetch data -----------------
@app.get("/pdf-data")
async def pdf_data():
    """Returns last extracted invoice or a mock."""
    return JSONResponse(_last_extraction or _mock_invoice())

@app.get("/invoice")
async def get_invoice(id: str = "demo"):
    data = _invoices.get(id) or _mock_invoice()
    return JSONResponse(data)

@app.post("/invoice")
async def save_invoice(inv: Invoice):
    _invoices[inv.id] = inv.dict()
    return {"ok": True}
