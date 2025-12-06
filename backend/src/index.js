require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: function(origin, callback) {
    // Allowed origins list
    const allowedOrigins = [
      'http://localhost:3001',
      'http://localhost:3002',
      'http://localhost:3000'
    ];
    
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Sync database and start server
sequelize.sync({ alter: process.env.NODE_ENV === 'development' }).then(() => {
  console.log('✅ Database synchronized');
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📚 API Docs: http://localhost:${PORT}/api-docs`);
  });
}).catch((error) => {
  console.error('❌ Database sync failed:', error);
  process.exit(1);
});

module.exports = app;
