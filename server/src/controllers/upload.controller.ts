import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { FileModel } from '../models/file.model';
import { saveFile } from '../services/storage.service';
import { generateCode } from '../services/code.service';
import { generateQR } from '../services/qr.service';
import { env } from '../config/env';

export const uploadFile = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json({ success: false, error: 'No file uploaded' });
            return;
        }

        const file = req.file;
        const ext = path.extname(file.originalname);
        const storedName = `${uuidv4()}${ext}`;

        // Save file to disk
        await saveFile(file, storedName);

        // Generate unique short code
        const code = await generateCode();

        // Calculate expiry
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + env.FILE_TTL_HOURS);

        // Save to database
        const fileDoc = await FileModel.create({
            originalName: file.originalname,
            storedName,
            size: file.size,
            mimeType: file.mimetype,
            code,
            expiresAt,
            ipHash: req.ipHash || 'unknown',
        });

        // Generate QR code
        const fileUrl = `${env.CLIENT_URL}/file/${code}`;
        const qrCode = await generateQR(fileUrl);

        res.status(201).json({
            success: true,
            file: {
                id: fileDoc.id,
                originalName: fileDoc.original_name,
                size: fileDoc.size,
                code: fileDoc.code,
                qrCode,
                expiresAt: new Date(fileDoc.expires_at).toISOString(),
            },
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ success: false, error: 'Upload failed' });
    }
};
