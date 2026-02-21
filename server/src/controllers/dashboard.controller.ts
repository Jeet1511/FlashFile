import { Request, Response } from 'express';
import { FileModel } from '../models/file.model';

export const getDashboard = async (req: Request, res: Response): Promise<void> => {
    try {
        const ipHash = req.ipHash || 'unknown';

        const files = await FileModel.findByIpHash(ipHash);

        const totalFiles = files.length;
        const totalSize = files.reduce((acc, f) => acc + Number(f.size), 0);
        const totalDownloads = files.reduce((acc, f) => acc + f.download_count, 0);

        res.json({
            success: true,
            stats: {
                totalFiles,
                totalSize,
                totalDownloads,
            },
            files: files.map((f) => ({
                id: f.id,
                originalName: f.original_name,
                size: f.size,
                mimeType: f.mime_type,
                code: f.code,
                uploadedAt: f.uploaded_at,
                expiresAt: f.expires_at,
                downloadCount: f.download_count,
            })),
        });
    } catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).json({ success: false, error: 'Failed to load dashboard' });
    }
};
