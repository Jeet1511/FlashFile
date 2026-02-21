import { Router } from 'express';
import multer from 'multer';
import { uploadFile } from '../controllers/upload.controller';
import { env } from '../config/env';
import path from 'path';
import fs from 'fs';

const router = Router();

// Ensure temp upload directory exists
const tempDir = path.join(env.UPLOAD_DIR, '../temp');
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

const upload = multer({
    dest: tempDir,
    limits: {
        fileSize: env.MAX_FILE_SIZE_MB * 1024 * 1024,
    },
});

router.post('/', upload.single('file'), uploadFile);

export default router;
