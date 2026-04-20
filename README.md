# CNR Mini CRM — Client Intake, Lead Tracking & Quote Management

**A lightweight Mini CRM for freelancers and small businesses.**

Manage your entire sales pipeline in one place — from the first client inquiry, through lead tracking, to sending and closing quotes. No backend, no database, no bloat.

---

## Features

**Client Intake Form**
Capture new client inquiries with name, email, service type, and message. Live validation and a clean submission flow that feeds directly into the lead pipeline.

**Lead Dashboard**
Stat cards for Total Leads, New, Contacted, and Closed. Full table with inline status updates, status filters, and two-click delete. Conversion rate calculated automatically.

**Quote Tracker**
Create quotes with client details, service description, amount, and expiry date. Track each quote through Draft → Sent → Accepted / Rejected. Summary cards for total pipeline value and acceptance rate.

**General**
- All data persisted in `localStorage` — no backend required
- State-based view switching — no router
- Clean SaaS-style UI with a consistent design system
- Fully responsive

---

## System Overview

CNR Mini CRM combines three modules into a single, unified interface:

1. **Intake** — Capture inbound client inquiries via the intake form
2. **Lead Tracking** — Convert inquiries into leads and move them through New → Contacted → Closed
3. **Quote Management** — Create quotes for leads and track them from Draft through to Accepted or Rejected

Each module is independent but shares the same design language and sidebar navigation. The workflow is designed to take a prospect from first contact to closed deal without switching tools.

---

## Screenshots

| Intake Form | Leads Dashboard | Quotes Dashboard |
|---|---|---|
| *(screenshot)* | *(screenshot)* | *(screenshot)* |

> Run the app locally, capture each view, and save to `/screenshots`.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 (Vite) |
| Styling | Plain CSS — custom properties, no UI library |
| Storage | Browser `localStorage` |
| Routing | `useState` view switching |
| Fonts | Inter (Google Fonts) |
| Icons | Inline SVG |

No UI library. No state manager. No backend. Intentionally lightweight.

---

## Use Case

Built for **freelancers and small service businesses** — consultants, designers, agencies — who need a structured way to manage their sales pipeline without the overhead of a full CRM.

- Replace scattered emails and DMs with a single intake flow
- Track every lead from first contact to close
- Send and monitor quotes without juggling spreadsheets
- Know at a glance how many leads are active and how much pipeline value is open

Not a replacement for HubSpot or Salesforce. A replacement for having no system at all.

---

## How to Run

Requires Node.js 18+.

```bash
git clone https://github.com/cnrakpinar1-jpg/cnr-mini-crm.git
cd cnr-mini-crm
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

```bash
npm run build    # production build
npm run preview  # preview the build locally
```

---

*Built by CNR Solutions*
