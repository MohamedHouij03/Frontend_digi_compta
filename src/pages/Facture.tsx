import { useEffect, useMemo, useState } from 'react';
import { Card, Form, Input, DatePicker, InputNumber, Button, Table, Space, Typography, message } from 'antd';
import dayjs from 'dayjs';
import type { ColumnsType } from 'antd/es/table';
import { fetchInvoice, saveInvoice, type Invoice, type InvoiceLine } from '@/lib/invoiceApi';
import { fetchExtraction } from '@/lib/extractionApi';
import { normalizeToInvoice } from '@/lib/normalizeInvoice';
import InvoiceViewer from '@/components/InvoiceViewer';
import { useLocation } from 'react-router-dom';

export default function Facture() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const stateInvoice = (location.state as any)?.invoice as Partial<Invoice> | undefined;
    if (stateInvoice) {
      const inv = normalizeToInvoice(stateInvoice);
      setInvoice(inv);
      form.setFieldsValue({ ...inv, date: inv.date ? dayjs(inv.date) : undefined } as any);
      setLoading(false);
    } else {
      // Try latest extraction first, fallback to stored invoice
      fetchExtraction()
        .then((raw) => {
          const normalized = normalizeToInvoice(raw);
          setInvoice(normalized);
          form.setFieldsValue({ ...normalized, date: normalized.date ? dayjs(normalized.date) : undefined } as any);
        })
        .catch(() =>
          fetchInvoice('demo').then((inv) => {
            const normalized = normalizeToInvoice(inv);
            setInvoice(normalized);
            form.setFieldsValue({ ...normalized, date: normalized.date ? dayjs(normalized.date) : undefined } as any);
          })
        )
        .catch((e) => {
          console.error(e);
          message.error("Échec de chargement de la facture");
        })
        .finally(() => setLoading(false));
    }
  }, [form, location.state]);

  const columns: ColumnsType<InvoiceLine> = useMemo(() => [
    { title: 'Désignation', dataIndex: 'description' },
    { title: 'Qté', dataIndex: 'quantity', width: 80 },
    { title: 'PU', dataIndex: 'unitPrice', width: 120 },
    { title: 'Total', dataIndex: 'total', width: 120 },
  ], []);

  function pickInvoiceEditable(values: any) {
    return {
      supplierName: values.supplierName,
      supplierVat: values.supplierVat,
      invoiceNumber: values.invoiceNumber,
      date: values.date,
      currency: values.currency,
      // lines unchanged here; editing lines is not implemented in this form
    };
  }

  function recalc(inv: Invoice): Invoice {
    const lines = inv.lines.map((l) => ({ ...l, total: +(l.quantity * l.unitPrice).toFixed(2) }));
    const subtotal = +lines.reduce((s, l) => s + l.total, 0).toFixed(2);
    const tax = +(subtotal * 0.19).toFixed(2);
    const total = +(subtotal + tax).toFixed(2);
    return { ...inv, lines, subtotal, tax, total };
  }

  async function onSave(values: any) {
    if (!invoice) return;
    const editable = pickInvoiceEditable(values);
    const merged: Invoice = recalc({
      ...invoice,
      ...editable,
      date: (editable.date ? dayjs(editable.date).toISOString() : invoice.date) as any,
    });
    try {
      await saveInvoice(merged);
      setInvoice(merged);
      message.success('Facture enregistrée');
    } catch (e) {
      console.error(e);
      message.error("Échec d'enregistrement");
    }
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <Typography.Title level={4}>Facture</Typography.Title>
      <Card loading={loading}>
        <Form form={form} layout="vertical" onFinish={onSave}>
          <Space style={{ display: 'flex' }} size="large" wrap>
            <Form.Item label="Fournisseur" name="supplierName" rules={[{ required: true, message: 'Requis' }]}>
              <Input placeholder="Nom du fournisseur" />
            </Form.Item>
            <Form.Item label="Adresse fournisseur" name="supplierAddress">
              <Input placeholder="Adresse complète" />
            </Form.Item>
            <Form.Item label="Téléphone fournisseur" name="supplierPhone">
              <Input placeholder="Ex: +216 ..." />
            </Form.Item>
            <Form.Item label="Email fournisseur" name="supplierEmail" rules={[{ type: 'email', message: 'Email invalide' }]}> 
              <Input placeholder="contact@fournisseur.tn" />
            </Form.Item>
            <Form.Item label="Matricule TVA" name="supplierVat">
              <Input placeholder="TN..." />
            </Form.Item>
            <Form.Item label="N° facture" name="invoiceNumber" rules={[{ required: true, message: 'Requis' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Date" name="date" rules={[{ required: true, message: 'Requis' }]}>
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
            <Form.Item label="Devise" name="currency" rules={[{ required: true, message: 'Requis' }]}>
              <Input style={{ width: 100 }} />
            </Form.Item>
          </Space>

          <Card size="small" title="Lignes">
            <Table<InvoiceLine>
              rowKey="id"
              columns={columns}
              dataSource={invoice?.lines || []}
              pagination={false}
            />
          </Card>

          <Space style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
            <Form.Item label="Sous-total" name="subtotal">
              <InputNumber prefix={invoice?.currency} readOnly />
            </Form.Item>
            <Form.Item label="TVA (19%)" name="tax">
              <InputNumber prefix={invoice?.currency} readOnly />
            </Form.Item>
            <Form.Item label="Total" name="total">
              <InputNumber prefix={invoice?.currency} readOnly />
            </Form.Item>
            <Button type="primary" htmlType="submit">Enregistrer</Button>
          </Space>
        </Form>
      </Card>

      <Card title="Flux WebSocket (dernières factures reçues)">
        <InvoiceViewer />
      </Card>
    </Space>
  );
}


