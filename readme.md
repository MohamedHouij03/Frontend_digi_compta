<div align="center">

# 🧾 Digi Compta

**Plateforme de Comptabilité Numérique pour Cabinets Comptables Tunisiens**

*Automatisez votre flux documentaire — de la collecte de factures à la génération de déclarations fiscales*

[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Ant Design](https://img.shields.io/badge/Ant_Design-5.18-0170FE?style=for-the-badge&logo=antdesign&logoColor=white)](https://ant.design/)
[![n8n](https://img.shields.io/badge/n8n-Workflow-EA5B4B?style=for-the-badge&logo=n8n&logoColor=white)](https://n8n.io/)
[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)

---

### 🎬 Démo Vidéo

<!-- PLACEHOLDER: Demo Video — Replace the URL below with your actual demo video link -->
[![Demo Video Placeholder](https://img.shields.io/badge/▶_Watch_Demo-Coming_Soon-FF6B6B?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/PLACEHOLDER_DEMO_VIDEO)

> 📌 *Remplacez le lien ci-dessus par l'URL de votre vidéo de démonstration.*

---

</div>

## 📖 Table des Matières

- [📍 À Propos](#-à-propos)
- [✨ Fonctionnalités](#-fonctionnalités)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Stack Technique](#️-stack-technique)
- [📁 Structure du Projet](#-structure-du-projet)
- [🚀 Installation & Lancement](#-installation--lancement)
- [🔄 Flux de Données](#-flux-de-données)
- [🌐 Plateformes Nationales](#-plateformes-nationales)
- [📸 Captures d'Écran](#-captures-décran)
- [⚙️ Configuration](#️-configuration)
- [🤝 Contribution](#-contribution)
- [📝 Licence](#-licence)
- [👥 Auteurs](#-auteurs)

---

## 📍 À Propos

**Digi Compta** est une plateforme de comptabilité numérique conçue spécifiquement pour les **cabinets comptables tunisiens**. Elle automatise l'ensemble du pipeline documentaire — de la collecte de factures PDF à la génération de déclarations fiscales — en s'appuyant sur l'OCR intelligent via n8n et la diffusion en temps réel via WebSocket.

### 🎯 Problème Résolu

Les cabinets comptables tunisiens font face à des défis majeurs dans leur quotidien :

| Défi | Impact |
|------|--------|
| 📄 Saisie manuelle des factures | Perte de temps considérable, erreurs humaines |
| 🔄 Processus fragmentés | Multiples outils non connectés entre eux |
| 📋 Déclarations fiscales fastidieuses | Risque de retard et de pénalités |
| 🏛️ Déclarations multi-plateformes | CNSS, JIBAYA, RNE — chaque portail est séparé |
| 🗃️ Archivage peu fiable | Perte de documents, difficulté de recherche |

**Digi Compta** adresse ces problématiques en unifiant l'ensemble du flux dans une seule interface intuitive et automatisée.

---

## ✨ Fonctionnalités

### 📊 Tableau de Bord (Dashboard)
- Statistiques clés en temps réel : documents mensuels, déclarations générées, taux d'automatisation
- Indicateurs de tendance avec évolution mensuelle
- KPIs visuels avec cartes de synthèse

### 📤 Collecte de Documents
- Glisser-déposer de fichiers PDF via une interface intuitive
- Stockage local dans IndexedDB pour accès hors-ligne
- Déclenchement automatique du pipeline OCR via webhook n8n
- Prévisualisation et suppression des documents

### 🔍 OCR Intelligent
- Extraction automatique des données de factures via n8n
- Suivi de l'état de traitement : *Terminé* / *En cours*
- Normalisation robuste des données extraites (champs français/anglais, formats numériques tunisiens)

### 🧾 Éditeur de Factures
- Formulaire complet auto-rempli à partir des données OCR
- Informations fournisseur (nom, TVA, adresse, téléphone, email)
- Lignes de factures avec description, quantité, prix unitaire et total
- Sauvegarde automatique vers le backend

### ⚡ Temps Réel (WebSocket)
- Diffusion en direct des factures traitées
- Visualisation instantanée des données entrantes
- Mise à jour automatique sans rechargement de page

### 📋 Déclarations Fiscales
- Gestion des déclarations TVA et IR
- Suivi par période avec indicateurs de statut
- Génération automatique à partir des données de factures

### 👥 Gestion des Clients
- Tableau de bord des informations clients
- Détails : raison sociale, NIF (Numéro d'Identification Fiscale), contacts
- Actions d'édition en ligne

### 🏛️ Plateformes Nationales
- Intégration avec les plateformes gouvernementales tunisiennes :
  - **CNSS** — Caisse Nationale de Sécurité Sociale
  - **JIBAYA** — Déclaration fiscale en ligne
  - **RNE** — Registre National des Entreprises
- Activation/désactivation par plateforme via interrupteurs

### 📈 Tableaux de Bord & KPIs
- Graphiques de tendance du volume documentaire (Recharts)
- Analyse mensuelle avec courbes d'évolution
- Données de janvier à juin avec projections

### 🔗 Intégration Mosais
- Configuration de connexion au logiciel comptable Mosais
- Synchronisation du plan comptable, des écritures et des pièces justificatives
- Test de connexion intégré

### 📦 Archivage
- Coffre-fort numérique chiffré pour le stockage de documents
- Conformité avec les exigences réglementaires tunisiennes

### 👤 Gestion des Utilisateurs
- Multi-profils : **Admin**, **Comptable**, **Client**
- Attribution de rôles avec code couleur
- Contrôle d'accès basé sur les profils

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      NAVIGATEUR (CLIENT)                     │
│  ┌─────────┐  ┌──────────┐  ┌──────────┐  ┌─────────────┐  │
│  │  React   │  │ Zustand  │  │IndexedDB │  │  WebSocket  │  │
│  │  + AntD  │  │  Store   │  │ DocStore │  │   Client    │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └──────┬──────┘  │
│       │              │              │                │         │
└───────┼──────────────┼──────────────┼────────────────┼─────────┘
        │              │              │                │
        ▼              ▼              ▼                ▼
┌─────────────────────────────────────────────────────────────┐
│                   VITE DEV SERVER (PROXY)                     │
│         /api ──────► FastAPI   /n8n ──────► n8n             │
└───────────┬──────────────────────────┬───────────────────────┘
            │                          │
            ▼                          ▼
┌───────────────────────┐  ┌──────────────────────────────────┐
│     FASTAPI (8000)     │  │          n8n (5678)              │
│  ┌──────────────────┐  │  │  ┌────────────────────────────┐  │
│  │  REST Endpoints  │  │  │  │   Webhooks de Workflow     │  │
│  │  /api/pdf-data   │  │  │  │   ├─ Upload Facture       │  │
│  │  /invoice        │  │  │  │   ├─ Extraction OCR       │  │
│  │  /ws (WebSocket) │  │  │  │   └─ API Facture          │  │
│  └──────────────────┘  │  │  └────────────────────────────┘  │
│  ┌──────────────────┐  │  │  ┌────────────────────────────┐  │
│  │  Stockage        │  │  │  │   Moteur OCR               │  │
│  │  ├─ In-Memory    │  │  │  │   (Grok / Mistral)         │  │
│  │  └─ Filesystem   │  │  │  └────────────────────────────┘  │
│  └──────────────────┘  │  └──────────────────────────────────┘
└───────────────────────┘
```

---

## 🛠️ Stack Technique

### Frontend

| Technologie | Version | Rôle |
|:------------|:-------:|:-----|
| ![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react) | 18.2 | Framework UI |
| ![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?logo=typescript) | 5.4 | Typage statique |
| ![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite) | 5.4 | Build & Dev Server |
| ![Ant Design](https://img.shields.io/badge/Ant_Design-5.18-0170FE?logo=antdesign) | 5.18 | Bibliothèque de composants |
| ![React Router](https://img.shields.io/badge/React_Router-6.26-CA4245?logo=reactrouter) | 6.26 | Routage côté client |
| ![Zustand](https://img.shields.io/badge/Zustand-4.5-orange) | 4.5 | Gestion d'état légère |
| ![Recharts](https://img.shields.io/badge/Recharts-2.12-8884D8) | 2.12 | Visualisation de données |
| ![Axios](https://img.shields.io/badge/Axios-1.7-5A29E4?logo=axios) | 1.7 | Client HTTP |
| ![Day.js](https://img.shields.io/badge/Day.js-1.11-FF6633) | 1.11 | Manipulation de dates (locale FR) |

### Backend & Infrastructure

| Technologie | Version | Rôle |
|:------------|:-------:|:-----|
| ![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?logo=fastapi) | 0.111+ | Serveur API REST |
| ![Uvicorn](https://img.shields.io/badge/Uvicorn-0.30-333333) | 0.30+ | Serveur ASGI |
| ![httpx](https://img.shields.io/badge/httpx-0.27-2E86C1) | 0.27+ | Client HTTP asynchrone |
| ![n8n](https://img.shields.io/badge/n8n-Workflow-EA5B4B?logo=n8n) | — | Moteur d'automatisation |
| ![WebSocket](https://img.shields.io/badge/WebSocket-Realtime-010101) | — | Communication temps réel |
| ![IndexedDB](https://img.shields.io/badge/IndexedDB-Storage-F2921D) | — | Stockage client-side |

---

## 📁 Structure du Projet

```
Frontend_digi_compta/
├── 📄 .env.local                     # Variables d'environnement Vite
├── 📄 main.py                        # Serveur FastAPI
├── 📄 package.json                   # Dépendances NPM
├── 📄 requirements.txt               # Dépendances Python
├── 📄 vite.config.ts                 # Configuration Vite (proxy, alias)
├── 📄 index.html                     # Point d'entrée HTML
│
├── 📂 src/
│   ├── 📄 main.tsx                   # Point d'entrée React + Day.js FR
│   ├── 📄 App.tsx                    # Layout principal (Sidebar + Routes)
│   ├── 📄 styles.css                 # Styles globaux (couleur marque, layout)
│   │
│   ├── 📂 components/
│   │   ├── 📄 InvoiceViewer.jsx      # Composant de flux factures WebSocket
│   │   └── 📄 InvoiceViewer.d.ts     # Déclarations de types
│   │
│   ├── 📂 pages/
│   │   ├── 📄 index.ts               # Barrel export
│   │   ├── 📄 Accueil.tsx            # 📊 Tableau de bord
│   │   ├── 📄 Collecte.tsx           # 📤 Collecte de documents
│   │   ├── 📄 Facture.tsx            # 🧾 Éditeur de factures
│   │   ├── 📄 Extraction.tsx         # 🔍 Extraction n8n
│   │   ├── 📄 OCR.tsx                # 🔍 Suivi OCR
│   │   ├── 📄 TempsReel.tsx          # ⚡ Vue temps réel
│   │   ├── 📄 Declarations.tsx       # 📋 Déclarations fiscales
│   │   ├── 📄 DonneesClients.tsx      # 👥 Données clients
│   │   ├── 📄 Plateformes.tsx        # 🏛️ Plateformes nationales
│   │   ├── 📄 Mosais.tsx             # 🔗 Intégration Mosais
│   │   ├── 📄 Archivage.tsx          # 📦 Archivage
│   │   ├── 📄 TableauxDeBord.tsx     # 📈 KPIs & graphiques
│   │   └── 📄 Utilisateurs.tsx       # 👤 Gestion utilisateurs
│   │
│   ├── 📂 lib/
│   │   ├── 📄 docStore.ts            # Stockage IndexedDB
│   │   ├── 📄 extractionApi.ts       # Client API extraction n8n
│   │   ├── 📄 invoiceApi.ts          # Client API CRUD factures
│   │   ├── 📄 n8n.ts                 # Déclencheur webhook n8n
│   │   └── 📄 normalizeInvoice.ts    # Normalisation des données factures
│   │
│   └── 📂 store/
│       └── 📄 appStore.ts            # Store Zustand (état global)
│
├── 📂 storage/                        # Données webhook côté serveur
│   ├── 📄 webhook_*.json             # Données normalisées
│   └── 📄 webhook_raw_*.json         # Données brutes
│
└── 📂 dist/                           # Build de production
```

---

## 🚀 Installation & Lancement

### 📋 Prérequis

Assurez-vous d'avoir les outils suivants installés sur votre machine :

| Outil | Version minimale | Installation |
|:------|:----------------:|:-------------|
| ![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js) | 18+ | [nodejs.org](https://nodejs.org/) |
| ![Python](https://img.shields.io/badge/Python-3.10+-3776AB?logo=python) | 3.10+ | [python.org](https://www.python.org/) |
| ![n8n](https://img.shields.io/badge/n8n-Latest-EA5B4B?logo=n8n) | Dernière | [docs.n8n.io](https://docs.n8n.io/) |
| ![Git](https://img.shields.io/badge/Git-Latest-F05032?logo=git) | Dernière | [git-scm.com](https://git-scm.com/) |

### ⚡ Installation Rapide

```bash
# 1️⃣ Cloner le dépôt
git clone https://github.com/MohamedHouij03/Frontend_digi_compta.git
cd Frontend_digi_compta

# 2️⃣ Installer les dépendances Frontend
npm install

# 3️⃣ Installer les dépendances Backend
python -m venv venv
source venv/bin/activate    # Linux/macOS
# ou: venv\Scripts\activate  # Windows
pip install -r requirements.txt

# 4️⃣ Configurer les variables d'environnement
cp .env.local.example .env.local
# Éditez .env.local avec vos URLs n8n et WebSocket
```

### 🔧 Lancement en Développement

Ouvrez **trois terminaux** et lancez les services suivants :

```bash
# 🖥️ Terminal 1 — n8n (moteur de workflow)
n8n start

# 🐍 Terminal 2 — FastAPI (backend)
source venv/bin/activate
python main.py
# → Serveur démarré sur http://127.0.0.1:8000

# ⚛️ Terminal 3 — Vite (frontend)
npm run dev
# → Application disponible sur http://localhost:5173
```

### 🏗️ Build de Production

```bash
# Générer le build optimisé
npm run build

# Prévisualiser le build
npm run preview
```

---

## 🔄 Flux de Données

Le pipeline complet de traitement d'une facture suit les étapes suivantes :

```
    ┌──────────┐     ┌───────────┐     ┌──────────┐     ┌───────────┐
    │  UPLOAD  │────►│  INDEXEDDB│────►│  WEBHOOK │────►│    OCR    │
    │  PDF     │     │  STOCKAGE │     │  n8n     │     │  n8n      │
    └──────────┘     └───────────┘     └──────────┘     └─────┬─────┘
                                                                │
                                                                ▼
    ┌──────────┐     ┌───────────┐     ┌──────────┐     ┌───────────┐
    │  ÉDITIO… │◄────│  NORMALI… │◄────│  RÉPONSE │◄────│  EXTRACTION│
    │  FACTURE │     │  DONNÉES  │     │  n8n     │     │  TEXTE    │
    └─────┬────┘     └───────────┘     └──────────┘     └───────────┘
          │
          ▼
    ┌──────────┐     ┌───────────┐
    │  SAUVEGA…│────►│  WEBSOCKET│────►  Diffusion temps réel
    │  BACKEND │     │  BROADCAST│       à tous les clients
    └──────────┘     └───────────┘
```

### Détail du Pipeline

1. **📤 Upload** — L'utilisateur glisse-dépose un PDF dans la page *Collecte*
2. **💾 Stockage** — Le PDF est sauvegardé localement dans IndexedDB
3. **🔔 Déclenchement** — Le webhook n8n est appelé avec le fichier PDF
4. **🔍 OCR** — n8n exécute le workflow d'extraction (Grok/Mistral)
5. **🔄 Normalisation** — Les données brutes sont normalisées (`normalizeInvoice.ts` côté frontend, `normalize_to_invoice_shape()` côté backend) — les deux implémentations gèrent les noms de champs français/anglais, les objets imbriqués, et l'enrobage n8n
6. **✏️ Édition** — Les données normalisées remplissent automatiquement l'éditeur de facture
7. **📡 Diffusion** — Le backend diffuse la facture à tous les clients WebSocket connectés
8. **🖥️ Affichage** — Les pages *Temps Réel* et *InvoiceViewer* affichent les données en direct

### 🛡️ Mécanismes de Résilience

- **Fallback n8n** — Si l'URL n8n n'est pas configurée, le système continue avec un message d'information
- **Sources multiples** dans la page Facture : état du routeur → extraction stockée → extraction live → données de démonstration
- **Analyse numérique robuste** — Gestion des formats numériques français (espaces insécables, virgules décimales)
- **Désenrobage n8n** — Gestion des enveloppements `{json}`, `{output}` et tableaux n8n
- **Double normalisation** — Frontend (TypeScript) et backend (Python) implémentent la même logique indépendamment

---

## 🌐 Plateformes Nationales

Digi Compta intègre les plateformes gouvernementales tunisiennes essentielles pour les cabinets comptables :

| Plateforme | Acronyme | Rôle | Statut |
|:-----------|:---------|:-----|:------:|
| Caisse Nationale de Sécurité Sociale | CNSS | Déclarations sociales | ✅ Connecté |
| Plateforme de Déclaration Fiscale | JIBAYA | Déclarations d'impôts | 🔲 En cours |
| Registre National des Entreprises | RNE | Registre commercial | 🔲 En cours |

---

## 📸 Captures d'Écran

<!-- PLACEHOLDER: Screenshots — Replace with actual screenshots of your application -->

<div align="center">

| 📊 Tableau de Bord | 📤 Collecte |
|:------------------:|:-----------:|
| ![Dashboard](https://placehold.co/600x400/1a1a2e/eee?text=📊+Dashboard) | ![Collecte](https://placehold.co/600x400/1a1a2e/eee?text=📤+Collecte) |

| 🧾 Éditeur de Factures | ⚡ Temps Réel |
|:----------------------:|:------------:|
| ![Facture](https://placehold.co/600x400/1a1a2e/eee?text=🧾+Facture) | ![TempsReel](https://placehold.co/600x400/1a1a2e/eee?text=⚡+Temps+Réel) |

| 📋 Déclarations | 👥 Clients |
|:---------------:|:----------:|
| ![Declarations](https://placehold.co/600x400/1a1a2e/eee?text=📋+Déclarations) | ![Clients](https://placehold.co/600x400/1a1a2e/eee?text=👥+Clients) |

</div>

> 📌 *Remplacez les images ci-dessus par de vraies captures d'écran de l'application.*

---

## ⚙️ Configuration

### Variables d'Environnement

Créez un fichier `.env.local` à la racine du projet :

```env
# 🔗 API Backend
VITE_API_BASE=http://127.0.0.1:8000

# 🔗 n8n Webhooks
VITE_N8N_WEBHOOK_URL=http://localhost:5678/webhook/invoice-upload
VITE_N8N_EXTRACTION_URL=http://localhost:5678/webhook/extraction
VITE_N8N_INVOICE_API_URL=http://localhost:5678/webhook/invoice-api

# ⚡ WebSocket
VITE_WS_BASE=ws://127.0.0.1:8000

# 🔗 n8n Upload (Backend)
N8N_UPLOAD_URL=http://localhost:5678/webhook/upload
```

### Proxy Vite

Le proxy est configuré dans `vite.config.ts` pour rediriger les requêtes en développement :

| Route | Cible | Description |
|:------|:------|:------------|
| `/api` | `http://127.0.0.1:8000` | API FastAPI |
| `/n8n` | `http://localhost:5678` | Webhooks n8n |

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment participer :

### 🔄 Processus de Contribution

1. 🍴 **Forkez** le dépôt
2. 🌿 **Créez** une branche feature : `git checkout -b feature/ma-nouvelle-fonctionnalite`
3. 💻 **Développez** votre fonctionnalité
4. ✅ **Testez** vos changements
5. 📝 **Commitez** avec un message clair : `git commit -m "feat: ajout de la fonctionnalité X"`
6. 📤 **Poussez** votre branche : `git push origin feature/ma-nouvelle-fonctionnalite`
7. 🔀 **Ouvrez** une Pull Request

### 📜 Convention de Commits

| Type | Description |
|:-----|:------------|
| `feat` | Nouvelle fonctionnalité |
| `fix` | Correction de bug |
| `docs` | Modification de la documentation |
| `style` | Changements de formatage (pas de logique) |
| `refactor` | Refactoring du code |
| `test` | Ajout ou modification de tests |
| `chore` | Tâches de maintenance |

### 🐋 Roadmap

- [ ] 🔐 Authentification et gestion des sessions
- [ ] 🗄️ Base de données persistante (PostgreSQL)
- [ ] 🧪 Tests unitaires et d'intégration
- [ ] 🐳 Dockerisation de l'application
- [ ] 🚀 Déploiement CI/CD
- [ ] 📱 Application mobile responsive
- [ ] 🔔 Système de notifications
- [ ] 📊 Rapports et exports PDF/Excel
- [ ] 🏛️ Connexion complète CNSS / JIBAYA / RNE
- [ ] 🔒 Chiffrement de bout en bout pour l'archivage

---

## 📝 Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](./LICENSE) pour plus de détails.

---

## 👥 Auteurs

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/MohamedHouij03">
        <img src="https://img.shields.io/badge/GitHub-MohamedHouij03-181717?style=flat-square&logo=github" alt="GitHub"/>
        <br />
        <sub><b>Mohamed Houij</b></sub>
      </a>
    </td>
  </tr>
</table>

---

<div align="center">

**Fait avec ❤️ pour les cabinets comptables tunisiens**

[⬆️ Retour en haut](#-digi-compta)

</div>
