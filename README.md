# ThriftNG API - Complete E-commerce & Thrift Management Platform

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)
![Express](https://img.shields.io/badge/Express-5.x-lightgrey.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-green.svg)
![Paystack](https://img.shields.io/badge/Paystack-Integration-orange.svg)

---

## 📋 Table of Contents
- [Overview](#-overview)
- [Architecture](#-architecture)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation & Setup](#-installation--setup)
- [API Documentation](#-api-documentation)
- [Models & Schemas](#-models--schemas)
- [Payment Integration](#-payment-integration)
- [Admin Dashboard](#-admin-dashboard)
- [Deployment](#-deployment)
- [Testing](#-testing)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🚀 Overview
ThriftNG is a comprehensive backend API powering a dual-purpose platform combining **e-commerce marketplace** with **group thrift (Ajo/Esusu) management**. Built with Node.js, Express, and MongoDB, this system provides robust APIs for user management, product catalog, shopping cart, wishlists, order processing, group contributions, and payment integration with Paystack.

---

## 🏗 Architecture

```text
thriftng-api/
├── 📁 config/
│   └── env.js
├── 📁 controllers/
│   ├── admin.controller.js
│   ├── category.controller.js
│   ├── checkout.js
│   ├── contribution.controller.js
│   ├── group.controller.js
│   ├── order.controller.js
│   ├── product.controller.js
│   ├── soloAccCon.js
│   ├── webhook.controller.js
│   └── wishlist.controller.js
├── 📁 docs/
│   └── swagger.js
├── 📁 middleware/
│   ├── auth.middleware.js
│   └── admin.middleware.js
├── 📁 models/
│   ├── category.model.js
│   ├── contribution.model.js
│   ├── createAcc.js
│   ├── group.model.js
│   ├── order.model.js
│   ├── payment.model.js
│   ├── product.model.js
│   └── wishlist.model.js
├── 📁 routes/
│   ├── admin.route.js
│   ├── category.route.js
│   ├── checkout.js
│   ├── contribution.route.js
│   ├── createAccRoute.js
│   ├── group.route.js
│   ├── order.route.js
│   ├── product.route.js
│   ├── webhook.route.js
│   └── wishlist.route.js
├── 📁 services/
│   └── contribution.reminder.js
├── 📁 database/
│   └── mongodb.js
├── app.js
├── package.json
└── .env.example




## ✨ Features

🔐 Authentication & Authorization

- JWT-based authentication with bcrypt password hashing
- Role-based access control (User, Admin)
- Protected routes with middleware
- Session management

🛒 E-commerce Marketplace

- Product catalog with categories
- Shopping cart functionality
- Wishlist management
- Order processing system
- Inventory management
- Product search and filtering

👥 Thrift Group Management

- Create and manage thrift groups 
- Member management (add/remove)
- Monthly contribution tracking
- Automated contribution reminders
- Payment tracking per group
- Contribution status monitoring

💳 Payment System

- Paystack payment gateway integration
- One-time payments for marketplace
- Recurring contributions for thrift groups
- Webhook support for real-time updates
- Payment verification and reconciliation
- Multi-currency support (NGN default)

📊 Admin Dashboard

- Real-time analytics and statistics
- User management
- Order management
- Payment tracking
- Group contribution monitoring
- Revenue reports

⚙️ Advanced Features

- Automated cron jobs for reminders
- Webhook verification and security
- CORS configuration with whitelisting
- Input validation and sanitization
- Comprehensive error handling
- Rate limiting (planned)
- API documentation with Swagger UI
---

🛠 Tech Stack

Backend
- Node.js 20.x
- Express.js 5.x
JavaScript ES6+

Database
- MongoDB 7.x
- Mongoose 8.x

Authentication & Security
- JWT (jsonwebtoken)
- bcryptjs

Payment Integration
- Paystack
- Axios

Development Tools

Swagger UI + Swagger JSDoc

dotenv

node-cron

cors

express.json, cookie-parser

📦 Installation & Setup
Prerequisites

Node.js 18.x or higher

MongoDB 6.x or higher

Paystack account

Git

Step 1: Clone Repository
git clone https://github.com/yourusername/thriftng-api.git
cd thriftng-api

Step 2: Install Dependencies
npm install

Step 3: Environment Configuration
cp .env.example .env.development.local


Edit .env.development.local:

PORT=5000
NODE_ENV=development
MONGODB_URL=mongodb://localhost:27017/thriftng
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRES_IN=7d
PAYSTACK_SECRET=sk_test_your_paystack_secret_key
PAYSTACK_PUBLIC_KEY=pk_test_your_paystack_public_key
WEBHOOK_SECRET=your_webhook_secret
FRONTEND_URL=http://localhost:5173
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:5000
ADMIN_EMAIL=admin@thriftng.com
ADMIN_PASSWORD=secure_admin_password

Step 4: Run Development Server
npm run dev

Step 5: Access API Documentation

Visit: http://localhost:5000/api-docs

📚 API Documentation

Base URL

Development: http://localhost:5000

Production: https://api.thriftng.com

API Versioning
All endpoints are prefixed with /api/v1/

Authentication
Include JWT token in Authorization header:

Authorization: Bearer your_jwt_token_here

🔌 API Endpoints Summary

(End points table here...)

📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
