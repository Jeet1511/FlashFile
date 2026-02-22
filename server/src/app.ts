import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import { ipHashMiddleware } from './middlewares/ipHash.middleware';
import uploadRoutes from './routes/upload.routes';
import fileRoutes from './routes/file.routes';
import dashboardRoutes from './routes/dashboard.routes';

const app = express();

// Middleware
const allowedOrigin = env.CLIENT_URL.endsWith('/')
    ? env.CLIENT_URL.slice(0, -1)
    : env.CLIENT_URL;

app.use(cors({
    origin: allowedOrigin,
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(ipHashMiddleware);

// Routes
app.use('/api/upload', uploadRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Health check
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Global error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
});

export default app;
