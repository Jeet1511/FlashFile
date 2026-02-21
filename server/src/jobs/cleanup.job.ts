import cron from 'node-cron';
import { cleanExpiredFiles } from '../services/cleanup.service';

export const startCleanupJob = (): void => {
    // Run every 15 minutes
    cron.schedule('*/15 * * * *', async () => {
        console.log('🔄 Running cleanup job...');
        await cleanExpiredFiles();
    });

    console.log('⏰ Cleanup job scheduled (every 15 minutes)');
};
