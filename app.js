import express from 'express';
import cors from 'cors';
import { corsOptions } from './config/cors.js';
import routes from './routes/index.js';
import { notFoundHandler } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route for convenience
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Ask OUI API Server',
    healthCheck: '/api/health'
  });
});

// API Routes
app.use('/api', routes);

// 404 Handler for unknown routes
app.use(notFoundHandler);

// Centralized Error Handler
app.use(errorHandler);

export default app;
