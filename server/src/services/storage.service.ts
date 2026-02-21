import fs from 'fs';
import path from 'path';
import { env } from '../config/env';

// Ensure upload directory exists
if (!fs.existsSync(env.UPLOAD_DIR)) {
    fs.mkdirSync(env.UPLOAD_DIR, { recursive: true });
}

export const saveFile = async (
    file: Express.Multer.File,
    storedName: string
): Promise<string> => {
    const destPath = path.join(env.UPLOAD_DIR, storedName);
    fs.renameSync(file.path, destPath);
    return destPath;
};

export const deleteFile = async (storedName: string): Promise<void> => {
    const filePath = path.join(env.UPLOAD_DIR, storedName);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
};

export const getFilePath = (storedName: string): string => {
    return path.join(env.UPLOAD_DIR, storedName);
};
