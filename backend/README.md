# HK Dealers Backend

Production-ready Node.js API using Express and MongoDB (Mongoose). Includes JWT auth, admin routes, and seeding.

---

## How to run the server

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   - Copy `.env.example` to `.env`
   - Set `MONGODB_URI` (MongoDB Atlas connection string) and `JWT_SECRET`

3. **Start the server**
   ```bash
   npm run dev
   ```
   Or for production:
   ```bash
   npm start
   ```
   Server runs on `http://localhost:5000` by default (override with `PORT` in `.env`).

---

## Environment variables

| Variable           | Description                                      | Example |
|--------------------|---------------------------------------------------|---------|
| `PORT`             | Server port                                      | `5000`  |
| `FRONTEND_ORIGIN`  | Allowed CORS origin (frontend URL)               | `http://localhost:5173` |
| `MONGODB_URI`      | MongoDB connection string (required)             | `mongodb+srv://user:pass@cluster.mongodb.net/dbname?retryWrites=true&w=majority` |
| `JWT_SECRET`       | Secret used to sign JWT tokens (required for auth)| Long random string |
| `CLOUD_NAME`      | Cloudinary cloud name (must match dashboard exactly) | From [Cloudinary Console](https://cloudinary.com/console) |
| `CLOUD_KEY`       | Cloudinary API key (for image upload)             | From Cloudinary Console |
| `CLOUD_SECRET`    | Cloudinary API secret (for image upload)          | From Cloudinary Console |

Create a `.env` file in the `backend/` folder and never commit it.

**Image upload:** If you see "Invalid cloud_name", set `CLOUD_NAME` to the exact value shown in your [Cloudinary Dashboard](https://cloudinary.com/console) (e.g. `hkdealers` or the auto-generated name like `dxxxxxx`).

---

## How to seed the database

Seeding inserts initial products from `src/data/products.js` into MongoDB.

1. Ensure `.env` has a valid `MONGODB_URI`.
2. Run:
   ```bash
   npm run seed
   ```
   This connects to the database, clears the `products` collection, and inserts the seed products. Other collections (users, orders, carts) are left unchanged.

---

## API overview

- **Auth:** `POST /api/auth/register`, `POST /api/auth/login`
- **Products:** `GET /api/products`, `GET /api/products/:id`, `POST|PUT|DELETE /api/products` (admin)
- **Orders:** `POST /api/orders`, `GET /api/orders/my`, `GET /api/orders` (admin), `PUT /api/orders/:id/status` (admin)
- **Users (admin):** `GET /api/users`, `GET /api/users/:id`, `DELETE /api/users/:id`
- **Admin stats:** `GET /api/admin/stats` → `{ totalUsers, totalOrders, totalProducts, totalRevenue }`

Protected routes require header: `Authorization: Bearer <token>`.
