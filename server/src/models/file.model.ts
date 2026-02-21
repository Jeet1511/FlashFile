import { pool } from '../config/db';

export interface IFile {
    id: string;
    original_name: string;
    stored_name: string;
    size: number;
    mime_type: string;
    code: string;
    uploaded_at: Date;
    expires_at: Date;
    ip_hash: string;
    download_count: number;
}

export const FileModel = {
    async create(data: {
        originalName: string;
        storedName: string;
        size: number;
        mimeType: string;
        code: string;
        expiresAt: Date;
        ipHash: string;
    }): Promise<IFile> {
        const result = await pool.query(
            `INSERT INTO files (original_name, stored_name, size, mime_type, code, expires_at, ip_hash)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
            [data.originalName, data.storedName, data.size, data.mimeType, data.code, data.expiresAt, data.ipHash]
        );
        return result.rows[0];
    },

    async findByCode(code: string): Promise<IFile | null> {
        const result = await pool.query(
            'SELECT * FROM files WHERE code = $1 AND expires_at > NOW()',
            [code]
        );
        return result.rows[0] || null;
    },

    async findByIpHash(ipHash: string): Promise<IFile[]> {
        const result = await pool.query(
            'SELECT * FROM files WHERE ip_hash = $1 ORDER BY uploaded_at DESC',
            [ipHash]
        );
        return result.rows;
    },

    async incrementDownloads(id: string): Promise<void> {
        await pool.query(
            'UPDATE files SET download_count = download_count + 1 WHERE id = $1',
            [id]
        );
    },

    async findExpired(): Promise<IFile[]> {
        const result = await pool.query(
            'SELECT * FROM files WHERE expires_at <= NOW()'
        );
        return result.rows;
    },

    async deleteById(id: string): Promise<void> {
        await pool.query('DELETE FROM files WHERE id = $1', [id]);
    },

    async existsByCode(code: string): Promise<boolean> {
        const result = await pool.query(
            'SELECT 1 FROM files WHERE code = $1',
            [code]
        );
        return result.rows.length > 0;
    },
};
