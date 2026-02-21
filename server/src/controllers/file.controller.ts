import { Request, Response } from 'express';
import { resolveCode } from '../services/code.service';
import { generateQR } from '../services/qr.service';
import { getFilePath } from '../services/storage.service';
import { FileModel } from '../models/file.model';
import { env } from '../config/env';
import fs from 'fs';

export const getFileByCode = async (req: Request, res: Response): Promise<void> => {
    try {
        const code = req.params.code as string;
        const file = await resolveCode(code);

        if (!file) {
            res.status(404).json({ success: false, error: 'File not found or expired' });
            return;
        }

        const fileUrl = `${env.CLIENT_URL}/file/${code}`;
        const qrCode = await generateQR(fileUrl);

        res.json({
            success: true,
            file: {
                id: file.id,
                originalName: file.original_name,
                size: file.size,
                mimeType: file.mime_type,
                code: file.code,
                qrCode,
                uploadedAt: new Date(file.uploaded_at).toISOString(),
                expiresAt: new Date(file.expires_at).toISOString(),
                downloadCount: file.download_count,
            },
        });
    } catch (error) {
        console.error('Get file error:', error);
        res.status(500).json({ success: false, error: 'Failed to retrieve file' });
    }
};

export const downloadFile = async (req: Request, res: Response): Promise<void> => {
    try {
        const code = req.params.code as string;
        const file = await resolveCode(code);

        if (!file) {
            res.status(404).json({ success: false, error: 'File not found or expired' });
            return;
        }

        const filePath = getFilePath(file.stored_name);

        if (!fs.existsSync(filePath)) {
            res.status(404).json({ success: false, error: 'File not found on server' });
            return;
        }

        // Increment download count
        await FileModel.incrementDownloads(file.id);

        res.setHeader('Content-Disposition', `attachment; filename="${file.original_name}"`);
        res.setHeader('Content-Type', file.mime_type);
        res.setHeader('Content-Length', file.size.toString());

        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    } catch (error) {
        console.error('Download error:', error);
        res.status(500).json({ success: false, error: 'Download failed' });
    }
};
