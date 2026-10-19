# 💰 Zero-Budget Production-Ready Full-Stack Architecture

[![License: MIT](https://shields.io)](https://opensource.org)
[![Next.js](https://shields.io)](https://nextjs.org)
[![Cloudflare Pages](https://shields.io)](https://cloudflare.com)
[![Fly.io](https://shields.io)](https://fly.io)
[![Supabase](https://shields.io)](https://supabase.com)

A modular, highly scalable, and completely **free-tier compatible** full-stack architecture. This boilerplate bridges Cloudflare Edge computing with Fly.io application layers and Supabase isolated datastores, managed via automated GitHub Actions CI/CD workflows. Perfect for Indie Hackers and production-grade MVPs with a **\$0 infrastructure monthly spend**.

---

## 🏗️ Architecture Design & Topology

```text
       [ Public Client Gateway ]
                  │
        ┌─────────┴─────────┐
        ▼                   ▼
┌───────────────┐   ┌───────────────┐
│  Cloudflare   │   │    Fly.io     │
│  Edge Pages   │   │  Micro-API    │
│ (Frontend UI) │   │ (Express App) │
└───────────────┘   └───────┬───────┘
        │                   │ (Data Engine Bridge)
        ▼                   ▼
┌───────────────────────────────────┐
│       Supabase Postgres Matrix    │
│  (Isolated Auth / Analytics DB)   │
└───────────────────────────────────┘
```

### Infrastructure Cost Breakdown (\$0/mo Limit Mapping)
*   **Frontend UI:** Hosted on **Cloudflare Pages** (Unlimited bandwidth, free edge routing).
*   **Compute Engine:** Hosted on **Fly.io** (1x Shared CPU, 256MB RAM basic container layer).
*   **Database & Auth Engine:** Hosted on **Supabase Free Tier** (500MB Postgres database + 50,000 MAU Identity service).

---

## 🚀 Getting Started

### 📋 Prerequisites
Ensure you have the following installed locally:
*   [Node.js v20.x+](https://nodejs.org)
*   [Docker Desktop](https://docker.com)
*   [Flyctl CLI](https://fly.iodocs/hands-on/install-flyctl/)

### 🔧 Local Installation & Orchestration

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com
    cd zero-budget-fullstack-boilerplate
    ```

2.  **Environment Configuration:**
    *   Navigate to `frontend-app/` and create a `.env.local` file:
        ```env
        NEXT_PUBLIC_SUPABASE_URL=https://supabase.co
        NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anonymous-key
        NEXT_PUBLIC_API_URL=http://localhost:8080
        ```
    *   Navigate to `backend-api/` and create a `.env` file:
        ```env
        PORT=8080
        SUPABASE_URL=https://supabase.co
        SUPABASE_SERVICE_ROLE_KEY=your-secure-service-role-key
        ALLOWED_ORIGINS=http://localhost:3000
        ```

3.  **Run the Local Development Cluster:**
    *   Launch the API backend container matrix:
        ```bash
        cd backend-api
        npm install
        npm start
        ```
    *   In a new terminal workspace, ignite the edge frontend user interface:
        ```bash
        cd frontend-app
        npm install
        npm run dev
        ```

---

## 🤖 CI/CD Automation Matrix (GitHub Actions)

To activate automated zero-downtime deployment pipelines, map the following secrets within your GitHub repository under **Settings > Secrets and Variables > Actions**:

| Secret Key | Description | Resource Provider |
| :--- | :--- | :--- |
| `CLOUDFLARE_API_TOKEN` | API token with Pages edit credentials. | Cloudflare Dashboard |
| `CLOUDFLARE_ACCOUNT_ID` | Global account routing footprint. | Cloudflare Dashboard |
| `FLY_API_TOKEN` | Access token generated via `fly auth token`. | Fly.io CLI |

---

## 🔒 Security Hardening Standards
*   **IMDSv2 & Helmet:** Core API incorporates network security headers enforcing strict transport security layers.
*   **Strict Rate Limiting:** Downstream API rates are throttled at a maximum of 100 requests per 15-minute window per IP to avoid server stress on the free tier.
*   **Dependency Auditing:** The continuous integration pipeline blocks deployment phases automatically if security audits fail high-severity criteria checking.
