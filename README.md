# 🍔 Hungrify - Admin Dashboard

Hungrify is a modern food ordering admin panel designed to manage restaurants, monitor orders, track revenue, and analyze sales performance. This dashboard offers powerful insights, real-time order management, and a clean UI built with React, Node.js, and MongoDB.

---

## 🚀 Features

- 📦 **Order Management**

  - View all orders
  - Filter by status: `pending`, `confirmed`, `preparing`, `on the way`, `delivered`, `cancelled`
  - Update order statuses dynamically

- 📊 **Analytics Dashboard**

  - Live metrics for orders, revenue, deliveries, cancellations, and new orders
  - Bar & Line charts for trends (This Week, Last Week, etc.)

- 🧾 **Revenue Tracking**

  - Real-time income overview
  - Graphical trends over time

- 👥 **User & Order Linking**

  - User-based order tracking
  - Auto-detachment of users from cancelled orders

- 📁 **Category-wise Menu Support**
  - Dynamic menu categories
  - Regional, Indian Snacks, Beverages, etc.

---

## 🛠️ Tech Stack

**Frontend**:

- React.js
- TailwindCSS
- Recharts (for graphs)

**Backend**:

- Node.js
- Express
- MongoDB (Mongoose ORM)

---

## 📂 Project Structure

hungrify/
├── client/ # React frontend
│ ├── src/
│ │ ├── assets/ # Images & icons
│ │ ├── components/ # Reusable UI components
│ │ ├── Context/ # React context API
│ │ ├── controller/ # Axios API functions
│ │ └── pages/ # Main views (Dashboard, Orders, etc.)
│
├── server/ # Node.js backend
│ ├── controllers/ # Order, user logic
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API routes
│ ├── middlewares/ # Error handling, authentication
│ └── utils/ # API response and error helpers

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/hungrify.git
cd hungrify

---

``# Backend setup
cd server
npm install

### create .env file and write your secret keys
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

---

``# Future Enhancements
1. Add role-based admin authentication
2. Push notifications for live order status
3. Export analytics reports as PDF
4. Add customer support dashboard

---
```
