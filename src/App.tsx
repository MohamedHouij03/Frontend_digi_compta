import { Layout, Menu, theme, ConfigProvider } from 'antd';
import frFR from 'antd/locale/fr_FR';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  FileSearchOutlined,
  CloudUploadOutlined,
  DatabaseOutlined,
  DeploymentUnitOutlined,
  SafetyCertificateOutlined,
  FileDoneOutlined,
  BarChartOutlined,
  TeamOutlined,
  WifiOutlined,
} from '@ant-design/icons';
import {
  Accueil,
  Collecte,
  DonneesClients,
  OCR,
  Mosais,
  Plateformes,
  Archivage,
  Declarations,
  TableauxDeBord,
  Utilisateurs,
  Facture,
  Extraction,
  TempsReel,
} from './pages';

const { Header, Sider, Content, Footer } = Layout;

export default function App() {
  const location = useLocation();
  const selectedKey = location.pathname === '/' ? '/accueil' : location.pathname;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <ConfigProvider locale={frFR}>
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="logo">Digi Compta</div>
        <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]}>
          <Menu.Item key="/accueil" icon={<DashboardOutlined />}>
            <Link to="/accueil">Tableau de bord</Link>
          </Menu.Item>
          <Menu.Item key="/collecte" icon={<CloudUploadOutlined />}>
            <Link to="/collecte">Collecte</Link>
          </Menu.Item>
          <Menu.Item key="/donnees" icon={<DatabaseOutlined />}>
            <Link to="/donnees">Données clients</Link>
          </Menu.Item>
          <Menu.Item key="/ocr" icon={<FileSearchOutlined />}>
            <Link to="/ocr">OCR</Link>
          </Menu.Item>
          <Menu.Item key="/mosais" icon={<DeploymentUnitOutlined />}>
            <Link to="/mosais">Intégration Mosais</Link>
          </Menu.Item>
          <Menu.Item key="/plateformes" icon={<TeamOutlined />}>
            <Link to="/plateformes">Plateformes nationales</Link>
          </Menu.Item>
          <Menu.Item key="/archivage" icon={<SafetyCertificateOutlined />}>
            <Link to="/archivage">Archivage</Link>
          </Menu.Item>
          <Menu.Item key="/declarations" icon={<FileDoneOutlined />}>
            <Link to="/declarations">Déclarations</Link>
          </Menu.Item>
          <Menu.Item key="/kpi" icon={<BarChartOutlined />}>
            <Link to="/kpi">KPI</Link>
          </Menu.Item>
          <Menu.Item key="/utilisateurs" icon={<TeamOutlined />}>
            <Link to="/utilisateurs">Utilisateurs</Link>
          </Menu.Item>
          <Menu.Item key="/facture" icon={<FileDoneOutlined />}>
            <Link to="/facture">Facture (édition)</Link>
          </Menu.Item>
          <Menu.Item key="/extraction" icon={<FileSearchOutlined />}>
            <Link to="/extraction">Extraction (n8n)</Link>
          </Menu.Item>
          <Menu.Item key="/temps-reel" icon={<WifiOutlined />}>
            <Link to="/temps-reel">Temps réel (WS)</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: colorBgContainer }}>
          <div className="header-title">Plateforme pour cabinets comptables</div>
        </Header>
        <Content style={{ margin: '16px' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
              <Route path="/accueil" element={<Accueil />} />
              <Route path="/collecte" element={<Collecte />} />
              <Route path="/donnees" element={<DonneesClients />} />
              <Route path="/ocr" element={<OCR />} />
              <Route path="/mosais" element={<Mosais />} />
              <Route path="/plateformes" element={<Plateformes />} />
              <Route path="/archivage" element={<Archivage />} />
              <Route path="/declarations" element={<Declarations />} />
              <Route path="/kpi" element={<TableauxDeBord />} />
              <Route path="/utilisateurs" element={<Utilisateurs />} />
              <Route path="/facture" element={<Facture />} />
              <Route path="/extraction" element={<Extraction />} />
              <Route path="/temps-reel" element={<TempsReel />} />
              <Route path="/" element={<Navigate to="/accueil" replace />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Digi Compta © 2025</Footer>
      </Layout>
    </Layout>
    </ConfigProvider>
  );
}


