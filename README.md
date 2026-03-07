# RoughRenthub

**Authentication:** Secure logins with JWT and role-based access (tenant / landlord).

## Run everything (one command)

From the project root:

```bash
npm install
cd backend && npm install && cd ../frontend && npm install
cd ..
npm run dev
```

- Backend runs at **http://localhost:5000**
- Frontend runs at **http://localhost:3000** (proxies API to backend)

If the backend isn’t running, the app switches to **demo mode** and you can still sign in with:

- **tenant@test.com** or **landlord@test.com** — password: **password123**

## Push to GitHub

Repo is ready to push: `.gitignore` excludes `node_modules`, `.env`, and build artifacts.

```bash
git init
git add .
git commit -m "RoughRenthub: JWT auth, RBAC, single-command run"
git remote add origin <your-repo-url>
git push -u origin main
```

## Tech

- **Frontend:** React, React Router, one global CSS file
- **Backend:** Express, JWT (jsonwebtoken), bcrypt, CORS
