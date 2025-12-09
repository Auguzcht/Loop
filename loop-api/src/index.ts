import { Hono } from 'hono';
import { cors } from 'hono/cors';
import quiz from './routes/quiz';
import grade from './routes/grade';

const app = new Hono();

// CORS configuration for frontend
app.use(
  '*',
  cors({
    origin: (origin) => {
      // Allow localhost for development
      if (origin.startsWith('http://localhost:')) return origin;
      // Allow all Vercel deployments
      if (origin.endsWith('.vercel.app')) return origin;
      // Fallback for any origin (can be restricted later)
      return origin;
    },
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Accept'],
    credentials: true,
  })
);

// Routes
app.route('/api/quiz', quiz);
app.route('/api/grade', grade);

// Health check
app.get('/', (c) => {
  return c.json({
    message: 'Loop API - Stay in the loop',
    version: '1.0.0',
    endpoints: {
      quiz: '/api/quiz',
      grade: '/api/grade',
    },
  });
});

export default app;
