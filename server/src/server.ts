import app from './app';
import { connectDB, initDB } from './config/db';
import { startCleanupJob } from './jobs/cleanup.job';
import { env } from './config/env';

const start = async (): Promise<void> => {
    console.log('🚀 Starting Mask Bee server...');
    try {
        // Connect to PostgreSQL
        console.log('⏳ Connecting to database...');
        await connectDB();

        // Initialize tables
        console.log('⏳ Initializing database tables...');
        await initDB();

        // Start cleanup cron job
        console.log('⏳ Starting background jobs...');
        startCleanupJob();

        // Start server
        const port = env.PORT;
        const host = '0.0.0.0';

        app.listen(port, host, () => {
            console.log(`
  🐝 Mask Bee Server running!
  🌐 http://${host}:${port}
  📁 Upload dir: ${env.UPLOAD_DIR}
  ⏱️  File TTL: ${env.FILE_TTL_HOURS} hours
  📦 Max file size: ${env.MAX_FILE_SIZE_MB} MB
  🐘 Database: PostgreSQL (Neon)
      `);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

start();
