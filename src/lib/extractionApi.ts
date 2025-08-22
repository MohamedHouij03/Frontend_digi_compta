export type ExtractedInvoice = {
  id?: string;
  supplierName?: string;
  supplierVat?: string;
  invoiceNumber?: string;
  date?: string; // ISO
  currency?: string;
  subtotal?: number;
  tax?: number;
  total?: number;
  lines?: Array<{ id?: string; description?: string; quantity?: number; unitPrice?: number; total?: number }>;
};

function getUrl(): string {
  const apiBase = (import.meta.env.VITE_API_BASE as string | undefined) || '/api';
  return (
    (import.meta.env.VITE_N8N_EXTRACTION_URL as string | undefined) ||
    `${apiBase}/pdf-data`
  );
}

export async function fetchExtraction(): Promise<ExtractedInvoice> {
  const url = getUrl();
  const res = await fetch(url, { method: 'GET' });
  if (!res.ok) throw new Error(`Extraction GET failed: ${res.status}`);
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) {
    return (await res.json()) as ExtractedInvoice;
  }
  // Non-JSON fallback
  const text = await res.text();
  return { supplierName: text };
}
