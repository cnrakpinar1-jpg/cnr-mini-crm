# CNR Solutions Demo — Client Intake & Lead Tracking System

A lightweight, portfolio-grade mini CRM built to demonstrate a complete client intake and lead management workflow. Clean SaaS-style UI, zero backend dependencies.

---

## Overview

Small businesses lose leads because there's no structured process for capturing and following up on inquiries. This tool solves that with a simple two-screen workflow: a public-facing intake form for clients, and a private admin dashboard for tracking every lead through to close.

---

## Features

**Intake Form**
- Clean client-facing form with name, email, service type, and message fields
- Live validation with inline error feedback
- Animated submission flow with success confirmation

**Admin Dashboard**
- Stat cards: Total Leads, New, Contacted, Closed — with live conversion rate
- Full leads table with client avatar, service tag, message preview, and submission date
- One-click status updates (New → Contacted → Closed) directly in the table
- Filter leads by status tab
- Two-click delete confirmation to prevent accidents
- Empty state handling

**General**
- All data persisted in `localStorage` — no backend or database required
- Fully responsive layout
- Portfolio demo banner for context when sharing with clients

---

## Screenshots

| Intake Form | Admin Dashboard |
|---|---|
| *(screenshot)* | *(screenshot)* |

> To add screenshots: run the app locally, capture each view, and save to `/screenshots`.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 |
| Bundler | Vite |
| Styling | Plain CSS with custom properties |
| Storage | Browser `localStorage` |
| Fonts | Inter (Google Fonts) |
| Icons | Inline SVG |

No UI libraries, no external state managers, no backend — intentionally lightweight.

---

## Run Locally

**Requirements:** Node.js 18+

```bash
git clone https://github.com/your-username/client-intake-mini-crm.git
cd client-intake-mini-crm
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

```bash
# Production build
npm run build
npm run preview
```

---

## Use Case

Built for **freelancers and small service businesses** who need a simple way to:

- Capture inbound client inquiries from a website or shared link
- Keep every lead in one place instead of scattered across email or DMs
- Track where each prospect is in the sales process
- Know at a glance how many leads are active vs. closed

This fits agencies, consultants, designers, and any service provider managing a handful of leads per week without needing a full CRM like HubSpot or Salesforce.

---

## Why It Matters

Most small businesses have no system for lead management. Inquiries come in through email, social media, or referrals — and get lost. Without a clear pipeline:

- Follow-ups are missed
- It's impossible to measure conversion
- No historical record exists for past clients

This tool introduces the minimum viable process: **capture, track, close**. The dashboard gives an immediate view of pipeline health, and the status workflow creates accountability without adding complexity.

---

## Project Status

Portfolio demo — functional with local storage. Production extension points: swap `localStorage` for a REST API or Supabase, add authentication for the admin dashboard, and embed the intake form as an iframe on any website.

---

*Built by CNR Solutions*
