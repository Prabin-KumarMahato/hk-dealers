# HK-Dealers — Full Folder Project Structure & Roadmap

Complete folder tree and a short roadmap of how the project is organized and how data flows.

---

## Full folder structure (project files only)

```
hk-dealers/
│
├── index.html                    # Vite entry HTML (frontend)
├── vite.config.js                # Vite config (React plugin, etc.)
├── package.json                  # Frontend deps & scripts (hk-website)
├── package-lock.json
├── PROJECT_STRUCTURE.md          # Project overview & MongoDB section
├── FOLDER_STRUCTURE_ROADMAP.md   # This file
│
├── public/
│   └── index.html
│
├── src/                          # ═══════ FRONTEND (React + Vite) ═══════
│   ├── main.jsx                  # App entry, React Router setup
│   ├── App.jsx                   # Root component, routes
│   ├── app.css                   # Global styles
│   │
│   ├── api/
│   │   └── client.js             # API client (VITE_API_URL, x-user-id)
│   │
│   ├── context/
│   │   └── CartContext.jsx       # Cart state (add/remove/quantity)
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── WatchCard.jsx
│   │   └── BannerSlider.jsx
│   │
│   ├── data/
│   │   └── watches.jsx           # Static/seed watch data (UI)
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   ├── Products.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── ProductDetail.css
│   │   ├── Cart.jsx
│   │   ├── Cart.css
│   │   ├── About.jsx
│   │   ├── About.css
│   │   ├── Contact.jsx
│   │   └── Contact.css
│   │
│   └── styles/
│       ├── BannerSlider.css
│       └── Navbar.css
│
└── backend/                      # ═══════ BACKEND (Node + Express) ═══════
    ├── package.json              # Backend deps & scripts (hk-dealers-backend)
    ├── server.js                 # Optional entry (if used)
    ├── .env.example              # PORT, FRONTEND_ORIGIN
    ├── .env                      # Create locally (do not commit)
    │
    └── src/
        ├── index.js              # Express app, CORS, mount routes, listen
        │
        ├── routes/
        │   ├── auth.js           # Auth (e.g. login/register/me)
        │   ├── products.js       # GET/POST products
        │   ├── cart.js          # GET/POST/PATCH/DELETE cart
        │   └── orders.js        # POST orders, GET my orders
        │
        ├── middleware/
        │   ├── errorHandler.js   # Central error handler
        │   └── notFound.js       # 404 handler
        │
        └── data/
            ├── store.js          # In-memory store (products, users, carts, orders)
            └── products.js       # Seed product data
```

---

## Roadmap: what lives where

| Layer        | Folder / file              | Role |
|-------------|----------------------------|------|
| **Frontend root** | `hk-dealers/`             | Vite app root: `index.html`, `vite.config.js`, `package.json` |
| **Frontend entry** | `src/main.jsx` → `App.jsx` | Bootstrap React and React Router |
| **API layer**     | `src/api/client.js`       | Single place for backend URL and `x-user-id`; `api.get/post/patch/delete` |
| **State**         | `src/context/CartContext.jsx` | Cart shared across pages |
| **UI building blocks** | `src/components/`   | Navbar, WatchCard, BannerSlider |
| **Screens**       | `src/pages/`              | Home, Products, ProductDetail, Cart, About, Contact |
| **Static data**   | `src/data/watches.jsx`    | Client-side watch list (can later come from API) |
| **Styles**        | `src/app.css`, `src/styles/`, `*.css` in pages | Global and per-page/per-component CSS |
| **Backend entry** | `backend/src/index.js`    | Express app, CORS, route mounting, listen |
| **API surface**   | `backend/src/routes/*.js` | auth, products, cart, orders |
| **Errors**        | `backend/src/middleware/` | notFound + errorHandler |
| **Data (current)**| `backend/src/data/store.js` + `products.js` | In-memory DB; replace with MongoDB when you add Atlas |

---

## Request flow (high level)

```
Browser (React)
    → src/api/client.js (VITE_API_URL, x-user-id)
    → Backend http://localhost:5000
    → backend/src/index.js (Express)
    → backend/src/routes/*.js
    → backend/src/data/store.js (in-memory; later → MongoDB)
    → JSON response back to frontend
```

---

## Quick reference: key files

| Purpose              | File |
|----------------------|------|
| Change API base URL  | `src/api/client.js` (or env `VITE_API_URL`) |
| Add a new page       | `src/pages/<Name>.jsx` + route in `App.jsx` |
| Add a new API route  | `backend/src/routes/<name>.js` + mount in `backend/src/index.js` |
| Backend port / CORS  | `backend/.env` → `PORT`, `FRONTEND_ORIGIN` (see `.env.example`) |
| Seed products        | `backend/src/data/products.js` and usage in `store.js` |

---

## Optional: future MongoDB layout (reference)

When you add MongoDB Atlas, you can extend the backend like this without changing the frontend:

```
backend/
├── .env                 # + MONGODB_URI
└── src/
    ├── index.js         # Connect to DB on startup
    ├── config/
    │   └── db.js        # MongoClient connect
    ├── models/          # Product, User, Cart, Order (if using Mongoose)
    ├── routes/          # Same; implementation uses DB instead of store.js
    ├── middleware/
    └── data/
        └── products.js  # Use for seeding DB
```

This keeps the same **folder roadmap**; only the data layer inside `backend/src` grows (config + models + DB-backed routes).
