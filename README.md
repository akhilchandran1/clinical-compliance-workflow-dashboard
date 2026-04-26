# Clinical Compliance Workflow Dashboard

## Project Overview
Clinical Compliance Workflow Dashboard is a frontend-only Vue 3 simulation of an internal compliance system used in clinical research operations. It demonstrates role-based workflows for document creation, review, approvals, audit logging, and compliance monitoring.

## Why This Was Built
This project was built as a portfolio-grade example of enterprise frontend engineering with a QA mindset, focusing on reliable workflow rules, data integrity, and production deployment readiness.

## Features
- Role selection (Researcher, Reviewer/QA, Admin/Compliance) without real authentication
- Dashboard KPIs and charts for workflow visibility
- Studies module with search and filtering
- Study details with linked documents and recent audit activity
- Documents module with create, submit, approve, reject actions
- Review queue for pending reviewer actions
- Compliance alerts generated from workflow/state checks
- Append-only audit trail with CSV export
- Demo data reset for Admin users
- localStorage persistence with corruption fallback to seed data
- Responsive layout for desktop, tablet, mobile
- Accessible forms, labels, keyboard-focusable controls, semantic structure

## Tech Stack
- Vue 3 + Vite + JavaScript
- Vue Router
- Pinia
- Tailwind CSS
- Chart.js + vue-chartjs
- localStorage (frontend persistence)

## Role-Based Workflow
- Researcher:
  - Create draft documents
  - Edit Draft/Rejected documents
  - Submit Draft/Rejected documents
- Reviewer / QA:
  - Process Submitted/Under Review documents
  - Move to Under Review
  - Approve or reject (rejection comment required, min length validation)
- Admin / Compliance:
  - Access all modules
  - Reset demo data
  - Export audit logs

## Compliance Concepts Demonstrated
- Clinical workflow simulation
- Audit trail with append-only behavior
- Data integrity principles (timestamps, before/after status, role attribution)
- Role-based actions and transition guards
- Validation and error handling for invalid transitions and corrupted local storage
- Frontend state management with isolated business logic in stores/utils
- Responsive enterprise-style UI with UX fallback states
- QA/testing mindset via deterministic workflow rules and safe fallback handling

## Mock Data Disclaimer
This application uses fictional studies, fictional users, and mock records only.
No real patient data, clinical data, or confidential data is included.

## Local Development
1. `npm install`
2. `npm run dev`
3. Open the local URL printed by Vite.

## Production Build
1. `npm run build`
2. Output is generated in `dist/`.
3. Optional local preview: `npm run preview`

## Git Setup Commands
```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin <repo-url>
git push -u origin main
```

## Example Logical Commit Messages
- `chore: scaffold vue3 vite tailwind app shell`
- `feat: add stores workflow rules and localStorage persistence`
- `feat: implement studies documents review queue and audit pages`
- `feat: add compliance alerts charts and role-based actions`
- `chore: add deployment config for vercel and netlify`
- `docs: add portfolio and deployment documentation`

## Deploy to Vercel (SPA Routing Ready)
1. Push repository to GitHub.
2. In Vercel, click **Add New Project** and import the repo.
3. Build settings:
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Output directory: `dist`
4. Confirm `vercel.json` exists at project root:
   ```json
   {
     "rewrites": [
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```
5. Deploy.
6. After deployment, verify deep-link refresh on routes like `/documents` and `/audit-trail`.

## Deploy to Netlify (SPA Routing Ready)
1. Push repository to GitHub.
2. In Netlify, click **Add new site** > **Import an existing project**.
3. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Ensure file `public/_redirects` exists with:
   ```text
   /* /index.html 200
   ```
5. Deploy and verify route refresh behavior on non-root routes.

## Auto Deployment / Continuous Deployability
- Both Vercel and Netlify can be connected directly to GitHub.
- Every push to the tracked branch (typically `main`) triggers automatic redeployment.
- This keeps the app continuously deployable and always shareable via a public URL.

## Screenshots
- `docs/screenshots/dashboard.png` (placeholder)
- `docs/screenshots/documents.png` (placeholder)
- `docs/screenshots/audit-trail.png` (placeholder)

## Portfolio Explanation
This project demonstrates production frontend thinking for regulated workflow simulation: structured state management, explicit transition rules, auditability, defensive error handling, and deployable SPA architecture suitable for portfolio review by engineering teams.
