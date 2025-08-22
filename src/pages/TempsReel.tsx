import { useEffect, useMemo, useRef, useState } from 'react';
import { Card, Typography, Descriptions, Table, Tag, Space } from 'antd';

type Incoming = {
  invoice_id: string;
  date: string;
  customer: Record<string, any>;
  items: Array<Record<string, any>>;
};

export default function TempsReel() {
  const [data, setData] = useState<Incoming | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const base = (import.meta.env.VITE_WS_BASE as string | undefined) || (location.origin.replace(/^http/, 'ws'));
    const url = `${base}/ws`;
    const ws = new WebSocket(url);
    wsRef.current = ws;
    ws.onmessage = (ev) => {
      try {
        const parsed = JSON.parse(ev.data);
        setData(parsed as Incoming);
      } catch {
        // ignore
      }
    };
    ws.onerror = () => {
      // no-op
    };
    return () => {
      ws.close();
      wsRef.current = null;
    };
  }, []);

  const columns = useMemo(() => {
    const keys = new Set<string>();
    (data?.items || []).forEach((it) => Object.keys(it || {}).forEach((k) => keys.add(k)));
    return Array.from(keys).map((k) => ({ title: k, dataIndex: k }));
  }, [data]);

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Typography.Title level={4}>Flux en temps réel (WebSocket)</Typography.Title>

      <Card>
        {data ? (
          <Descriptions title="Facture reçue" bordered column={1} size="small">
            <Descriptions.Item label="Invoice ID">{data.invoice_id}</Descriptions.Item>
            <Descriptions.Item label="Date">{data.date}</Descriptions.Item>
            <Descriptions.Item label="Client">
              <Space wrap>
                {Object.entries(data.customer || {}).map(([k, v]) => (
                  <Tag key={k}>{k}: {String(v)}</Tag>
                ))}
              </Space>
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <Typography.Text type="secondary">En attente de données depuis /ws…</Typography.Text>
        )}
      </Card>

      <Card title="Lignes">
        <Table
          rowKey={(r, idx) => String((r as any)?.id ?? idx)}
          dataSource={data?.items || []}
          columns={columns}
          pagination={false}
          size="small"
        />
      </Card>
    </Space>
  );
}


