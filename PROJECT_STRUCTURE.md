# HK-Dealers — Full Project Structure

This document describes the **hk-dealers** project: frontend, backend, and how **MongoDB Atlas** can be integrated.

---

## 1. Overview

| Part         | Location              | Stack                            | Purpose                                 |
| ------------ | --------------------- | -------------------------------- | --------------------------------------- |
| **Frontend** | `hk-dealers/` (root)  | React 18, Vite 5, React Router 6 | HK Dealers website (watches)            |
| **Backend**  | `hk-dealers/backend/` | Node (ESM), Express              | REST API (auth, products, cart, orders) |
| **Database** | —                     | **Currently in-memory**          | No MongoDB Atlas yet; see §4 to add it  |

---

## 2. Frontend Structure

```
hk-dealers/
├── index.html
├── vite.config.js
├── package.json              # "hk-website", Vite + React
├── package-lock.json
├── public/
│   └── index.html
└── src/
    ├── main.jsx               # Entry, React Router
    ├── App.jsx
    ├── app.css
    ├── api/
    │   └── client.js          # API client (VITE_API_URL, x-user-id)
    ├── context/
    │   └── CartContext.jsx    # Cart state
    ├── components/
    │   ├── Navbar.jsx
    │   ├── WatchCard.jsx
    │   └── BannerSlider.jsx
    ├── data/
    │   └── watches.jsx        # Static/seed data
    ├── pages/
    │   ├── Home.jsx, Home.css
    │   ├── Products.jsx
    │   ├── ProductDetail.jsx, ProductDetail.css
    │   ├── Cart.jsx, Cart.css
    │   ├── About.jsx, About.css
    │   └── Contact.jsx, Contact.css
    └── styles/
        ├── BannerSlider.css
        └── Navbar.css
```

**Frontend config**

- **Env:** `VITE_API_URL` (default `http://localhost:5000`) — used in `src/api/client.js`.
- **Scripts:** `npm run dev` / `npm start` → Vite dev server; `npm run build` → production build.

---

## 3. Backend Structure

```
hk-dealers/backend/
├── package.json               # "hk-dealers-backend", Express (ESM)
├── server.js                  # Optional entry; main entry is src/index.js
├── .env.example               # PORT, FRONTEND_ORIGIN
├── .env                       # Create from .env.example (do not commit)
└── src/
    ├── index.js               # Express app, CORS, routes, listen
    ├── routes/
    │   ├── auth.js            # Auth endpoints
    │   ├── products.js        # Products CRUD
    │   ├── cart.js            # Cart operations
    │   └── orders.js          # Orders
    ├── middleware/
    │   ├── errorHandler.js
    │   └── notFound.js
    └── data/
        ├── store.js           # In-memory store (products, users, carts, orders)
        └── products.js        # Seed product data
```

**Backend config**

- **Env (see `.env.example`):**
  - `PORT=5000`
  - `FRONTEND_ORIGIN=http://localhost:5173`
- **Scripts:** `npm run dev` (watch) or `npm start` → `node src/index.js`.
- **API base:** `http://localhost:5000` (health: `/api/health`).

**Current data layer**

- No database: all data lives in `src/data/store.js` (arrays + `Map` for carts).
- Replacing this with MongoDB Atlas is described in the next section.

---

## 4. MongoDB Atlas Integration (Planned)

Right now the backend uses **in-memory storage only**. To use **MongoDB Atlas**:

### 4.1 Backend layout with MongoDB

```
hk-dealers/backend/
├── .env                       # Add MONGODB_URI
├── .env.example               # Add MONGODB_URI=your_atlas_connection_string
├── src/
│   ├── index.js               # Connect to MongoDB on startup
│   ├── config/
│   │   └── db.js              # MongoDB connection (MongoClient)
│   ├── models/                # Optional: Mongoose schemas or plain collections
│   │   ├── Product.js
│   │   ├── User.js
│   │   ├── Cart.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── cart.js
│   │   └── orders.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── notFound.js
│   └── data/
│       ├── store.js           # Remove or keep only for fallback
│       └── products.js        # Use for seeding DB
```

### 4.2 Environment variables (backend)

```env
PORT=5000
FRONTEND_ORIGIN=http://localhost:5173
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
```

- Get `MONGODB_URI` from MongoDB Atlas: **Cluster → Connect → Driver (Node.js)**.
- Use a dedicated database name (e.g. `hk_dealers`).

### 4.3 Suggested collections (MongoDB Atlas)

| Collection | Purpose                               |
| ---------- | ------------------------------------- |
| `products` | Watch catalog                         |
| `users`    | User accounts (if you add auth)       |
| `carts`    | Per-user cart (e.g. `userId` + items) |
| `orders`   | Placed orders                         |

### 4.4 Dependencies to add (backend)

```bash
cd backend
npm install mongodb
# Or with Mongoose:
# npm install mongoose
```

---

## 5. Run order

1. **Backend:** `cd hk-dealers/backend && npm install && npm run dev` (port 5000).
2. **Frontend:** `cd hk-dealers && npm install && npm run dev` (e.g. port 5173).
3. Frontend uses `VITE_API_URL` to talk to the backend; default is `http://localhost:5000`.

---

## 6. Summary

| Item          | Current state                         | With MongoDB Atlas                                         |
| ------------- | ------------------------------------- | ---------------------------------------------------------- |
| Frontend      | Vite + React, `src/`, `api/client.js` | No change                                                  |
| Backend       | Express, in-memory `store.js`         | Add `config/db.js`, `models/`, use `MONGODB_URI`           |
| Database      | None (in-memory)                      | MongoDB Atlas; collections: products, users, carts, orders |
| Env (backend) | `PORT`, `FRONTEND_ORIGIN`             | Add `MONGODB_URI`                                          |

If you want, the next step can be: add `config/db.js`, update `.env.example` with `MONGODB_URI`, and switch one route (e.g. products) to use MongoDB Atlas instead of `store.js`.
