# CNR Solutions Demo — Mini CRM

**Client Intake, Lead Tracking & Quotes — in one lightweight tool.**

A mini CRM built for small businesses to manage client inquiries, track leads through a sales pipeline, and create and monitor quotes — all without a backend or database.

---

## Features

**Client Intake Form**
Capture new client inquiries with name, email, service type, and message. Live validation and a clean submission flow.

**Lead Dashboard**
Stat cards for Total Leads, New, Contacted, and Closed. Full table with status updates, filters, and two-click delete. Conversion rate tracked automatically.

**Quote Tracker**
Create quotes with client details, service description, amount, and expiry date. Track each quote from Draft → Sent → Won / Lost. Summary cards for total value and win rate.

**General**
- All data persisted in `localStorage` — no backend required
- State-based view switching — no router
- Clean SaaS-style UI with consistent design system
- Fully responsive

---

## System Overview

The app combines three workflows into a single interface:

1. **Intake** — A client submits an inquiry via the intake form
2. **Lead Tracking** — The inquiry becomes a lead, tracked through New → Contacted → Closed
3. **Quotes** — A quote is created for the client and managed through its own status pipeline

Each module is independent but shares the same design language and sidebar navigation.

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

Built for **freelancers and small service businesses** — agencies, consultants, designers — who need a simple internal tool to:

- Capture inbound inquiries in one place
- Track every lead through to close
- Create and follow up on quotes without a spreadsheet

Not a replacement for HubSpot. A replacement for nothing at all.

---

## How to Run

Requires Node.js 18+.

```bash
git clone https://github.com/your-username/client-intake-mini-crm.git
cd client-intake-mini-crm
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
