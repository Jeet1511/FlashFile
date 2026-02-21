import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';

declare global {
    namespace Express {
        interface Request {
            ipHash?: string;
        }
    }
}

export const ipHashMiddleware = (
    req: Request,
    _res: Response,
    next: NextFunction
): void => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    req.ipHash = crypto.createHash('sha256').update(ip).digest('hex');
    next();
};
