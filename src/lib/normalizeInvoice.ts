import type { Invoice } from '@/lib/invoiceApi';

function toNumber(value: any, fallback = 0): number {
  const n = typeof value === 'string' ? Number(value.replace(/,/g, '.')) : Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function toIsoDate(value: any): string {
  try {
    if (!value) return new Date().toISOString();
    const d = new Date(value);
    if (!isNaN(d.getTime())) return d.toISOString();
  } catch {}
  return new Date().toISOString();
}

export function normalizeToInvoice(raw: any): Invoice {
  const supplierName = raw?.supplierName || raw?.supplier || raw?.vendor || raw?.customer?.name || '';
  const supplierVat = raw?.supplierVat || raw?.vat || raw?.tva || '';
  const invoiceNumber = raw?.invoiceNumber || raw?.number || raw?.invoice_no || raw?.no || '';
  const date = toIsoDate(raw?.date || raw?.invoiceDate || raw?.issued_at);
  const currency = raw?.currency || raw?.devise || 'TND';
  const linesRaw = raw?.lines || raw?.items || [];

  const lines = (Array.isArray(linesRaw) ? linesRaw : []).map((l: any, idx: number) => {
    const quantity = toNumber(l?.quantity ?? l?.qty ?? l?.qte, 0);
    const unitPrice = toNumber(l?.unitPrice ?? l?.unit_price ?? l?.price_unit ?? l?.price, 0);
    const total = toNumber(l?.total, quantity * unitPrice);
    return {
      id: String(l?.id ?? idx + 1),
      description: l?.description || l?.designation || l?.item || '',
      quantity,
      unitPrice,
      total,
    };
  });

  const providedSubtotal = toNumber(raw?.subtotal, NaN);
  const computedSubtotal = Number.isFinite(providedSubtotal)
    ? providedSubtotal
    : lines.reduce((s: number, l: any) => s + toNumber(l.total, 0), 0);
  const providedTax = toNumber(raw?.tax, NaN);
  const tax = Number.isFinite(providedTax) ? providedTax : +(computedSubtotal * 0.19).toFixed(2);
  const providedTotal = toNumber(raw?.total, NaN);
  const total = Number.isFinite(providedTotal) ? providedTotal : +(computedSubtotal + tax).toFixed(2);

  return {
    id: String(raw?.id || raw?.invoice_id || 'from-n8n'),
    supplierName,
    supplierVat,
    invoiceNumber,
    date,
    currency,
    subtotal: +computedSubtotal.toFixed(2),
    tax,
    total,
    lines,
  };
}


