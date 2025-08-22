import React, { useEffect, useState } from 'react';

const InvoiceViewer = () => {
  const [invoices, setInvoices] = useState([]);
  const [status, setStatus] = useState('connecting');

  useEffect(() => {
    const base = import.meta.env.VITE_WS_BASE || window.location.origin.replace(/^http/, 'ws');
    const ws = new WebSocket(`${base}/ws`);

    ws.onopen = () => {
      setStatus('connected');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setInvoices((prev) => [data, ...prev]);
      } catch (e) {
        // ignore
      }
    };

    ws.onerror = () => {
      setStatus('error');
    };

    ws.onclose = () => {
      setStatus('closed');
    };

    return () => ws.close();
  }, []);

  if (invoices.length === 0) {
    return <div>WebSocket: {status}. Waiting for invoices...</div>;
  }

  return (
    <div>
      {invoices.map((invoice, index) => (
        <div key={index} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <h2>Invoice: {invoice.invoice_id || invoice.id}</h2>
          <p>Date: {invoice.date}</p>
          <p>
            Customer: {invoice.customer?.name || 'N/A'} ({invoice.customer?.email || 'N/A'})
          </p>
          <h3>Items:</h3>
          <ul>
            {(invoice.items || invoice.lines)?.map((item, idx) => (
              <li key={idx}>
                {item.description} - Qty: {item.quantity}, Unit Price: {item.unitPrice}, Total: {item.total}
              </li>
            ))}
          </ul>
          <p>
            Subtotal: {invoice.subtotal || 0} | Tax: {invoice.tax || 0} | Total: {invoice.total || 0}
          </p>
        </div>
      ))}
    </div>
  );
};

export default InvoiceViewer;


