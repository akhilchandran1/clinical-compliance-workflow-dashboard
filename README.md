# Clinical Compliance Workflow Dashboard

## Live Demo
- Vercel: _Add your deployed URL here_
- Netlify: _Add your deployed URL here_

## Project Purpose
Clinical Compliance Workflow Dashboard is a frontend-only Vue 3 simulation of a clinical research compliance system. It demonstrates realistic workflow controls, role-based document actions, auditability, and compliance monitoring in a portfolio-ready enterprise UI.

## UI/UX Improvements
- Fixed chart container sizing to prevent excessive scrolling and overflow.
- Upgraded typography, spacing, and hierarchy for modern readability.
- Introduced a cleaner enterprise visual system for cards, tables, badges, and buttons.
- Improved dashboard structure with KPI cards, chart areas, recent activity, and high-risk alert summaries.
- Strengthened responsive behavior for desktop, tablet, and mobile.

## Features
- Role selection (Researcher, Reviewer/QA, Admin/Compliance) with local persistence
- Dashboard KPIs and charts
- Studies module with search and filtering
- Study details with linked documents and recent audit activity
- Documents module with create, edit, submit, approve, reject actions
- Review queue for reviewer actions
- Compliance alerts generated from workflow checks
- Append-only audit trail with CSV export
- Admin-only demo data reset
- localStorage persistence with corruption fallback

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
  - Approve or reject with mandatory rejection comment
- Admin / Compliance:
  - Access all modules
  - Reset demo data
  - Export audit logs

## Compliance Concepts Demonstrated
- Clinical workflow simulation
- Append-only audit trail
- Data integrity principles (timestamps, status transitions, role attribution)
- Role-based access rules
- Validation and defensive error handling
- QA-oriented frontend architecture

## Mock Data Disclaimer
This application uses fictional studies, fictional users, and mock records only.
No real patient data, clinical data, or confidential data is included.

## Run Locally
1. `npm install`
2. `npm run dev`
3. Open the local URL printed by Vite.

## Build for Production
1. `npm run build`
2. Output is generated in `dist/`
3. Optional preview: `npm run preview`

## Deployment (Vercel)
1. Push repository to GitHub.
2. Import repository in Vercel.
3. Configure:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Deploy.
5. Verify deep-link refresh on routes like `/documents`, `/audit-trail`, `/compliance-alerts`.

## Deployment (Netlify)
1. Push repository to GitHub.
2. Import repository in Netlify.
3. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy and verify deep-link refresh on non-root routes.

## SPA Routing Note
This project includes SPA fallback routing configuration:
- `vercel.json` rewrites all routes to `index.html`
- `public/_redirects` includes `/* /index.html 200`

## Continuous Deployment
When connected to GitHub, Vercel and Netlify automatically redeploy on each push to the tracked branch.

## Portfolio Explanation
This project demonstrates production frontend engineering for regulated workflow simulation: role-driven state transitions, auditability, robust fallback behavior, responsive UI design, and deployment readiness.
