import app from './app';
import { connectDB, initDB } from './config/db';
import { startCleanupJob } from './jobs/cleanup.job';
import { env } from './config/env';

const start = async (): Promise<void> => {
    try {
        // Connect to PostgreSQL
        await connectDB();

        // Initialize tables
        await initDB();

        // Start cleanup cron job
        startCleanupJob();

        // Start server
        app.listen(env.PORT, () => {
            console.log(`
  ⚡ FlashFile Server running!
  🌐 http://localhost:${env.PORT}
  📁 Upload dir: ${env.UPLOAD_DIR}
  ⏱️  File TTL: ${env.FILE_TTL_HOURS} hours
  📦 Max file size: ${env.MAX_FILE_SIZE_MB} MB
  🐘 Database: PostgreSQL (Neon)
      `);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

start();
