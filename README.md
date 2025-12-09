# Trinity Bootstrap

A full-stack product management system with JWT authentication.

## 🚀 Features

- **Authentication System**: JWT-based login/register with access and refresh tokens
- **Product Management**: Full CRUD operations for products
- **Modern UI**: React-based responsive interface with modal dialogs
- **RESTful API**: Express backend with Swagger documentation
- **Docker Support**: Ready for containerized deployment

## 🛠️ Tech Stack

### Backend
- Node.js 18
- Express 5.2.1
- Sequelize ORM with PostgreSQL
- JWT Authentication
- Swagger/OpenAPI documentation
- bcryptjs for password hashing

### Frontend
- React 19.2.1
- Axios for API calls
- React Context for state management
- Modern CSS with animations

### Database
- PostgreSQL 16

## 📦 Installation

### Prerequisites
- Node.js 18+
- PostgreSQL 16+ (or use Docker)
- npm or yarn

### Clone the repository
```bash
git clone <your-repo-url>
cd trinity-bootstrap
```

### Setup PostgreSQL Database

#### Option 1: Local PostgreSQL
```bash
# Install PostgreSQL (Ubuntu/Debian)
sudo apt install postgresql postgresql-contrib

# Create database
sudo -u postgres psql
CREATE DATABASE trinity_bootstrap;
CREATE USER postgres WITH PASSWORD 'postgres';
GRANT ALL PRIVILEGES ON DATABASE trinity_bootstrap TO postgres;
\q
```

#### Option 2: Use Docker
```bash
docker run -d \
  --name trinity-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=trinity_bootstrap \
  -p 5432:5432 \
  postgres:16-alpine
```

### Install dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

## 🚀 Quick Start

### Method 1: Docker Compose (Recommended)
```bash
docker compose up
```
This will start PostgreSQL, backend, and frontend services automatically.

### Method 2: Manual startup (3 terminals)

#### Terminal 1 - PostgreSQL (if not using Docker)
Make sure PostgreSQL is running:
```bash
sudo systemctl start postgresql
# or
docker run -d --name trinity-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=trinity_bootstrap \
  -p 5432:5432 postgres:16-alpine
```

#### Terminal 2 - Backend
```bash
cd backend
npm run dev
```

#### Terminal 3 - Frontend
```bash
cd frontend
PORT=3002 npm start
```

## 🌐 Access

- **Frontend**: http://localhost:3002
- **Backend API**: http://localhost:3000
- **API Documentation**: http://localhost:3000/api-docs

## 📝 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/refresh` - Refresh access token
- `GET /auth/me` - Get current user (protected)

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `POST /products` - Create product (protected)
- `PUT /products/:id` - Update product (protected)
- `DELETE /products/:id` - Delete product (protected)

## 🔧 Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
NODE_ENV=development
PORT=3000

# PostgreSQL Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=trinity_bootstrap
DB_USER=postgres
DB_PASSWORD=postgres

# JWT Configuration
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret-key
JWT_EXPIRE=1h

# CORS Configuration
CORS_ORIGIN=http://localhost:3002
```

**Note**: Generate secure JWT secrets using:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 📖 Project Structure

```
trinity-bootstrap/
├── backend/
│   ├── config/
│   │   └── config.json          # Sequelize configuration
│   ├── migrations/              # Database migrations
│   ├── models/                  # Sequelize models (legacy)
│   ├── seeders/                 # Database seeders
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js     # Database connection
│   │   │   └── swagger.js      # Swagger/OpenAPI config
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── productController.js
│   │   ├── middleware/
│   │   │   └── auth.js         # JWT authentication
│   │   ├── models/
│   │   │   ├── index.js
│   │   │   ├── User.js
│   │   │   └── Product.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   └── products.js
│   │   └── index.js            # App entry point
│   ├── Dockerfile
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth.css
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── ProductList.js
│   │   │   ├── ProductList.css
│   │   │   ├── ProductModal.js
│   │   │   └── ProductModal.css
│   │   ├── context/
│   │   │   └── AuthContext.js  # Auth state management
│   │   ├── services/
│   │   │   └── api.js          # Axios API client
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── App.test.js
│   │   ├── index.js
│   │   ├── index.css
│   │   ├── logo.svg
│   │   ├── reportWebVitals.js
│   │   └── setupTests.js
│   ├── Dockerfile
│   ├── serve.json              # Static file server config
│   ├── package.json
│   └── package-lock.json
├── .env                        # Environment variables (not in git)
├── .env.example               # Environment template
├── .gitignore
├── docker-compose.yml
└── README.md
```

## 🐳 Docker Deployment

Build and run with Docker Compose (includes PostgreSQL):

```bash
docker compose up --build
```

The application will be available at:
- Frontend: http://localhost:3002
- Backend: http://localhost:3000
- PostgreSQL: localhost:5432

Stop all services:
```bash
docker compose down
```

Remove volumes (delete database data):
```bash
docker compose down -v
```

## 🧪 Development

### Backend Hot Reload
The backend uses `nodemon` for automatic restart on file changes.

### Frontend Hot Reload
React's development server automatically refreshes on code changes.

## 📚 Documentation

For detailed startup instructions and troubleshooting, see [START.md](START.md).

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🐛 Troubleshooting

### Port already in use
```bash
# Check what's using the port
lsof -i :3000  # Backend
lsof -i :3002  # Frontend
lsof -i :5432  # PostgreSQL

# Kill the process
kill -9 <PID>
```

### Database connection issues
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql
# or for Docker:
docker ps | grep postgres

# Reset database (Docker)
docker compose down -v
docker compose up -d postgres

# Check PostgreSQL logs
docker logs trinity-postgres
```

### Database migration issues
```bash
# Drop and recreate tables
cd backend
# The app will auto-sync on startup in development mode
npm run dev

