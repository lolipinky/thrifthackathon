
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)
![Express](https://img.shields.io/badge/Express-5.x-lightgrey.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-green.svg)
![Paystack](https://img.shields.io/badge/Paystack-Integration-orange.svg)

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

## 🚀 Overview

ThriftNG is a comprehensive backend API powering a dual-purpose platform combining **e-commerce marketplace** with **group thrift (Ajo/Esusu) management**. Built with Node.js, Express, and MongoDB, this system provides robust APIs for user management, product catalog, shopping cart, wishlists, order processing, group contributions, and payment integration with Paystack.

### Key Highlights
- ✅ **Dual Platform**: Marketplace + Thrift Group Management
- ✅ **Full Payment Integration**: Paystack with webhook support
- ✅ **Role-Based Access Control**: User, Admin permissions
- ✅ **Automated Systems**: Contribution reminders, payment tracking
- ✅ **Swagger API Documentation**: Interactive API explorer
- ✅ **Production Ready**: Scalable architecture with error handling

## 🏗 Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed system architecture documentation.

### Project Structure
thriftng-api/
\`\`\`
```text

├── 📁 config/                 # Environment configuration
│   └── env.js
├── 📁 controllers/           # Business logic handlers
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
├── 📁 docs/                  # API documentation
│   └── swagger.js
├── 📁 middleware/           # Authentication & authorization
│   ├── auth.middleware.js
│   └── admin.middleware.js
├── 📁 models/              # MongoDB schemas
│   ├── category.model.js
│   ├── contribution.model.js
│   ├── createAcc.js
│   ├── group.model.js
│   ├── order.model.js
│   ├── payment.model.js
│   ├── product.model.js
│   └── wishlist.model.js
├── 📁 routes/              # API route definitions
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
├── 📁 services/            # Background services
│   └── contribution.reminder.js
├── 📁 database/            # Database connection
│   └── mongodb.js
├── app.js                  # Main application entry point
├── package.json           # Dependencies
└── .env.example          # Environment template
```
\`\`\`

## ✨ Features

### 🔐 Authentication & Authorization
- JWT-based authentication with bcrypt password hashing
- Role-based access control (User, Admin)
- Protected routes with middleware
- Session management

### 🛒 E-commerce Marketplace
- Product catalog with categories
- Shopping cart functionality
- Wishlist management
- Order processing system
- Inventory management
- Product search and filtering

### 👥 Thrift Group Management
- Create and manage thrift groups (Ajo/Esusu)
- Member management (add/remove)
- Monthly contribution tracking
- Automated contribution reminders
- Payment tracking per group
- Contribution status monitoring

### 💳 Payment System
- Paystack payment gateway integration
- One-time payments for marketplace
- Recurring contributions for thrift groups
- Webhook support for real-time updates
- Payment verification and reconciliation
- Multi-currency support (NGN default)

### 📊 Admin Dashboard
- Real-time analytics and statistics
- User management
- Order management
- Payment tracking
- Group contribution monitoring
- Revenue reports

### ⚙️ Advanced Features
- Automated cron jobs for reminders
- Webhook verification and security
- CORS configuration with whitelisting
- Input validation and sanitization
- Comprehensive error handling
- Rate limiting (planned)
- API documentation with Swagger UI

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js 20.x
- **Framework**: Express.js 5.x
- **Language**: JavaScript ES6+

### Database
- **Database**: MongoDB 7.x
- **ODM**: Mongoose 8.x

### Authentication & Security
- **JWT**: jsonwebtoken
- **Password Hashing**: bcryptjs
- **Security Headers**: Helmet (recommended)

### Payment Integration
- **Gateway**: Paystack
- **HTTP Client**: Axios

### Development Tools
- **API Documentation**: Swagger UI + Swagger JSDoc
- **Environment Management**: dotenv
- **Cron Jobs**: node-cron
- **CORS**: cors middleware
- **Body Parsing**: express.json, cookie-parser

## 📦 Installation & Setup

### Prerequisites
- Node.js 18.x or higher
- MongoDB 6.x or higher
- Paystack account (for payment integration)
- Git

### Step 1: Clone Repository
\`\`\`bash
git clone https://github.com/yourusername/thriftng-api.git
cd thriftng-api
\`\`\`

### Step 2: Install Dependencies
\`\`\`bash
npm install
\`\`\`

### Step 3: Environment Configuration
\`\`\`bash
cp .env.example .env.development.local
\`\`\`

Edit \`.env.development.local\`:
\`\`\`env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URL=mongodb://localhost:27017/thriftng

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRES_IN=7d

# Paystack Configuration
PAYSTACK_SECRET=sk_test_your_paystack_secret_key
PAYSTACK_PUBLIC_KEY=pk_test_your_paystack_public_key

# Webhook Configuration
WEBHOOK_SECRET=your_webhook_secret

# CORS Configuration
FRONTEND_URL=http://localhost:5173
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:5000

# Admin Configuration (optional)
ADMIN_EMAIL=admin@thriftng.com
ADMIN_PASSWORD=secure_admin_password
\`\`\`

### Step 4: Database Setup
\`\`\`bash
# Start MongoDB (if not running)
mongod

# Or use MongoDB Atlas
# Update MONGODB_URL with your Atlas connection string
\`\`\`

### Step 5: Run Development Server
\`\`\`bash
npm run dev
\`\`\`

### Step 6: Access API Documentation
Visit: http://localhost:5000/api-docs

## 📚 API Documentation

### Base URL
\`\`\`
Development: http://localhost:5000
Production: https://api.thriftng.com
\`\`\`

### API Versioning
All endpoints are prefixed with \`/api/v1/\`

### Interactive Documentation
Access Swagger UI at: \`/api-docs\`

### Authentication
Include JWT token in Authorization header:
\`\`\`
Authorization: Bearer your_jwt_token_here
\`\`\`

### Response Format
All responses follow this structure:
\`\`\`json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "meta": { ... } // for paginated responses
}
\`\`\`

### Error Responses
\`\`\`json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message",
  "statusCode": 400
}
\`\`\`

## 🔌 API Endpoints Summary

### Authentication (\`/api/v1/account\`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | \`/createAcc\` | Register new user | No |
| POST | \`/signin\` | User login | No |

### Categories (\`/api/v1/category\`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | \`/\` | Create category | Yes (Admin) |
| GET | \`/\` | Get all categories | No |

### Products (\`/api/v1/products\`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | \`/\` | Create product | Yes (Admin) |
| GET | \`/\` | Get all products | No |
| GET | \`/:id\` | Get product by ID | No |
| PUT | \`/:id\` | Update product | Yes (Admin) |
| DELETE | \`/:id\` | Delete product | Yes (Admin) |

### Wishlist (\`/api/v1/wishlist\`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | \`/\` | Add to wishlist | Yes |
| GET | \`/\` | Get user wishlist | Yes |
| DELETE | \`/:productId\` | Remove from wishlist | Yes |

### Orders (\`/api/v1/orders\`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | \`/\` | Create order | Yes |
| GET | \`/my-orders\` | Get user orders | Yes |
| GET | \`/:id\` | Get order by ID | Yes |
| GET | \`/\` | Get all orders | Yes (Admin) |
| PATCH | \`/:id/status\` | Update order status | Yes (Admin) |

### Groups (\`/api/v1/group\`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | \`/create\` | Create thrift group | Yes (Admin) |
| GET | \`/\` | Get all groups | Yes |
| GET | \`/:id\` | Get group by ID | Yes |
| POST | \`/add-member\` | Add member to group | Yes (Admin) |
| POST | \`/remove-member\` | Remove member from group | Yes (Admin) |

### Contributions (\`/api/v1/contribution\`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | \`/contributions/generate\` | Generate monthly contributions | Yes (Admin) |
| GET | \`/contributions\` | Get all contributions | Yes (Admin) |
| GET | \`/contributions/my\` | Get user contributions | Yes |

### Checkout (\`/api/v1/checkout\`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | \`/initiate\` | Initiate payment | Yes |
| GET | \`/verify\` | Verify payment | Yes |

### Webhooks (\`/api/v1/webhook\`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | \`/paystack\` | Paystack webhook | No |

### Admin (\`/api/v1/admin\`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | \`/dashboard\` | Dashboard statistics | Yes (Admin) |
| GET | \`/payments\` | Get all payments | Yes (Admin) |
| GET | \`/orders\` | Get all orders | Yes (Admin) |
| GET | \`/groups/contributions\` | Group contribution stats | Yes (Admin) |

## 🗃 Models & Schemas

### User Model (createUser)
\`\`\`javascript
{
  fullName: String,        // Required
  phoneNumber: Number,     // Required, validated
  email: String,           // Required, unique, validated
  password: String,        // Required, hashed
  role: String,           // Enum: ['user', 'admin']
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### Product Model
\`\`\`javascript
{
  name: String,            // Required
  description: String,     // Required
  price: Number,          // Required
  category: ObjectId,     // Ref: Category
  images: [String],       // Array of URLs
  rating: Number,         // Default: 0
  stock: Number,          // Required, min: 0, max: 20
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### Group Model
\`\`\`javascript
{
  name: String,           // Required
  members: [ObjectId],    // Ref: createUser
  amountPerMonth: Number, // Required
  cycleStart: Date,       // Required
  cycleEnd: Date,         // Required
  status: String,         // Enum: ['active', 'completed', 'inactive']
  lastCollectedUser: ObjectId, // Ref: createUser
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### Contribution Model
\`\`\`javascript
{
  user: ObjectId,         // Ref: createUser, Required
  group: ObjectId,        // Ref: Group, Required
  amount: Number,         // Required
  cycleMonth: String,     // Format: "YYYY-MM", Required
  status: String,         // Enum: ['pending', 'paid']
  payment: ObjectId,      // Ref: Payment
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### Payment Model
\`\`\`javascript
{
  reference: String,      // Paystack reference, unique
  amount: Number,         // Required
  currency: String,       // Default: "NGN"
  status: String,         // Required: success/failed/abandoned
  email: String,          // Required
  user: ObjectId,         // Ref: createUser, Required
  group: ObjectId,        // Ref: Group, Required
  metadata: Object,       // Additional data
  channel: String,        // card, bank, transfer, etc.
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

## 💳 Payment Integration

### Paystack Setup
1. Create Paystack account at [paystack.com](https://paystack.com)
2. Get test/live API keys from dashboard
3. Configure webhook URL in Paystack settings:
   \`\`\`
   https://yourdomain.com/api/v1/webhook/paystack
   \`\`\`
4. Set webhook secret in environment variables

### Payment Flow
1. **Initiate Payment**: Client calls \`/checkout/initiate\`
2. **Redirect to Paystack**: User completes payment on Paystack
3. **Callback/Webhook**: Paystack notifies API via webhook
4. **Verification**: API verifies payment status
5. **Update Records**: Payment, Contribution, and Order records updated

### Webhook Security
- Signature verification using \`x-paystack-signature\`
- Duplicate payment prevention
- Secure event processing

## 📊 Admin Dashboard

### Statistics Endpoints
- **Dashboard Overview**: Total users, groups, payments, revenue
- **Payment Analytics**: Successful vs failed payments
- **Order Management**: View, update, track orders
- **Group Monitoring**: Contribution status, member tracking
- **Revenue Reports**: Daily, weekly, monthly breakdowns

### Admin Privileges
- **User Management**: View all users, update roles
- **Product Management**: Full CRUD operations
- **Order Processing**: Update status, handle cancellations
- **Group Administration**: Create/manage groups, add/remove members
- **Financial Oversight**: View all transactions, generate reports

## 🚀 Deployment

### Production Checklist
- [ ] Set \`NODE_ENV=production\`
- [ ] Use MongoDB Atlas or managed database
- [ ] Configure SSL certificate
- [ ] Set up domain name
- [ ] Configure environment variables
- [ ] Set up logging and monitoring
- [ ] Configure backup strategy
- [ ] Set up CDN for static files

### Deployment Platforms

#### Option 1: Railway/Render/Vercel
\`\`\`bash
# Install Railway CLI
npm i -g @railway/cli

# Deploy
railway up
\`\`\`

#### Option 2: Traditional Hosting (PM2)
\`\`\`bash
# Install PM2 globally
npm install -g pm2

# Start application
pm2 start app.js --name thriftng-api

# Save PM2 configuration
pm2 save
pm2 startup

# Monitor logs
pm2 logs thriftng-api
\`\`\`

#### Option 3: Docker Deployment
\`\`\`dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD ["node", "app.js"]
\`\`\`

## 🧪 Testing

### Running Tests
\`\`\`bash
# Install test dependencies
npm install --save-dev jest supertest

# Run tests
npm test

# Test coverage
npm run test:coverage
\`\`\`

### Test Structure
\`\`\`
tests/
├── unit/
│   ├── auth.test.js
│   ├── product.test.js
│   └── payment.test.js
├── integration/
│   ├── api.test.js
│   └── database.test.js
└── e2e/
    └── checkout.test.js
\`\`\`

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Commit changes with descriptive messages
4. Push to your branch
5. Submit a Pull Request

### Commit Message Convention
\`\`\`
feat: add new payment webhook endpoint
fix: resolve user authentication bug
docs: update API documentation
style: format code according to guidelines
refactor: reorganize controller structure
test: add unit tests for auth middleware
chore: update dependencies
\`\`\`

### Code Standards
- Follow ESLint configuration
- Write meaningful comments
- Maintain consistent naming conventions
- Include error handling
- Write unit tests for new features

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Paystack** for their robust payment API and documentation
- **MongoDB** for the powerful database solution
- **Express.js** team for the minimalist web framework
- Open-source community for invaluable tools and libraries
- Contributors who help improve this project

## 📞 Support & Contact

### Issue Reporting
- **GitHub Issues**: [Create New Issue](https://github.com/yourusername/thriftng-api/issues)
- **Priority**: High severity issues addressed within 24 hours

### Community
- **Discord/Slack**: Community channels (coming soon)
- **Documentation**: [API Docs](http://localhost:5000/api-docs)
- **Email**: support@thriftng.com

### Commercial Support
For enterprise support, SLA guarantees, and custom development:
- **Email**: ololadesamuel84@gmail.com
- **Phone**: +234 703 684 3550

---

**Built with ❤️ by the ThriftNG Team**

**Last Updated**: January 2026
`;

    
