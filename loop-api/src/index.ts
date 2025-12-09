import { Hono } from 'hono';
import { cors } from 'hono/cors';
import quiz from './routes/quiz';
import grade from './routes/grade';

const app = new Hono();

// CORS configuration for frontend
app.use(
  '*',
  cors({
    origin: ['http://localhost:3000', 'https://loop-app.vercel.app'],
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type'],
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
