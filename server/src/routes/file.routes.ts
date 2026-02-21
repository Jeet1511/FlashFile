import { Router } from 'express';
import { getFileByCode, downloadFile } from '../controllers/file.controller';

const router = Router();

router.get('/:code', getFileByCode);
router.get('/:code/download', downloadFile);

export default router;
