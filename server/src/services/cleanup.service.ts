import { FileModel } from '../models/file.model';
import { deleteFile } from './storage.service';

export const cleanExpiredFiles = async (): Promise<number> => {
    try {
        const expiredFiles = await FileModel.findExpired();

        let deletedCount = 0;

        for (const file of expiredFiles) {
            try {
                await deleteFile(file.stored_name);
                await FileModel.deleteById(file.id);
                deletedCount++;
            } catch (err) {
                console.error(`Failed to clean up file ${file.stored_name}:`, err);
            }
        }

        if (deletedCount > 0) {
            console.log(`🧹 Cleaned up ${deletedCount} expired file(s)`);
        }

        return deletedCount;
    } catch (error) {
        console.error('Cleanup error:', error);
        return 0;
    }
};
