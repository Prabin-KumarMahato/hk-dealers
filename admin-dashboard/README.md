# HK Dealers Admin Dashboard

React admin dashboard for HK Dealers backend. Uses JWT auth, protected routes, and Tailwind CSS.

## Tech

- React 18 + Vite 5
- React Router 6
- Axios (API client with interceptors)
- Auth state via React Context
- Tailwind CSS
- Recharts (dashboard charts)
- Lucide React (icons)

## Setup

1. **Install dependencies**

   ```bash
   cd admin-dashboard && npm install
   ```

2. **Environment**
   - Copy `.env.example` to `.env`
   - Set `VITE_API_URL` to your backend URL (default `http://localhost:5000`)

3. **Run**
   - Start the backend first (from `backend/`: `npm run dev`)
   - Then run the dashboard:
   ```bash
   npm run dev
   ```
   App runs at `http://localhost:5174` (see `vite.config.js`).

## Admin login (default credentials)

**Admin dashboard URL:** `http://localhost:5174` (after you run `npm run dev` in `admin-dashboard`).

**Default admin (created automatically when backend starts):**

| Field        | Value                 |
| ------------ | --------------------- |
| **Email**    | `admin@hkdealers.com` |
| **Password** | `Admin@123`           |

1. Start the **backend** first: `cd backend && npm run dev`
2. Start the **admin dashboard**: `cd admin-dashboard && npm run dev`
3. Open **http://localhost:5174** in the browser
4. On the login page, enter the email and password above

To use your own admin credentials, set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in the backend `.env`; the backend creates that admin on first start if it doesn’t exist.

## Features

- **Admin Login** — JWT; redirects to dashboard on success; only admin role allowed.
- **Dashboard** — Stats from `GET /api/admin/stats` (users, orders, products, revenue) and a bar chart.
- **Products** — Table with Add / Edit (modal) / Delete.
- **Orders** — Table with status dropdown (pending, paid, shipped, delivered); updates via `PUT /api/orders/:id/status`.
- **Users** — Table with delete; admin-only.
- **Sidebar layout** — Desktop sidebar; mobile drawer with overlay.
- **Protected routes** — All routes except `/login` require admin JWT; 401 logs out and redirects to login.

## Folder structure

```
admin-dashboard/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env.example
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── api/
    │   └── axios.js          # Axios instance + API helpers
    ├── context/
    │   └── AuthContext.jsx
    ├── components/
    │   ├── ProtectedRoute.jsx
    │   └── layout/
    │       ├── Layout.jsx
    │       ├── Sidebar.jsx
    │       └── Header.jsx
    └── pages/
        ├── Login.jsx
        ├── Dashboard.jsx
        ├── Products.jsx
        ├── Orders.jsx
        └── Users.jsx
```
