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
- Sequelize ORM with SQLite3
- JWT Authentication
- Swagger/OpenAPI documentation
- bcryptjs for password hashing

### Frontend
- React 19.2.1
- Axios for API calls
- React Context for state management
- Modern CSS with animations

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Clone the repository
```bash
git clone <your-repo-url>
cd trinity-bootstrap
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

### Method 1: Using start script (Recommended)
```bash
./start.sh
```

Stop services:
```bash
./stop.sh
```

### Method 2: Manual startup (2 terminals)

#### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

#### Terminal 2 - Frontend
```bash
cd frontend
PORT=3002 npm start
```

### Method 3: Docker Compose
```bash
docker compose up
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
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret-key
JWT_EXPIRE=1h
```

**Note**: Use `start.sh` script to generate secure JWT secrets automatically.

## 📖 Project Structure

```
trinity-bootstrap/
├── backend/
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Auth middleware
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   └── index.js        # App entry point
│   ├── package.json
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/        # Auth context
│   │   ├── services/       # API services
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── docker-compose.yml
├── start.sh               # Quick start script
├── stop.sh                # Stop services script
└── README.md
```

## 🐳 Docker Deployment

Build and run with Docker Compose:

```bash
docker compose up --build
```

The application will be available at:
- Frontend: http://localhost:3002
- Backend: http://localhost:3000

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

# Kill the process
kill -9 <PID>
```

### Database issues
```bash
# Reset database
rm backend/database.sqlite
# Restart backend to recreate
```

### Clear browser cache
If you see old data, hard refresh: `Ctrl + Shift + R`

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

Made with ❤️ using Node.js and React
