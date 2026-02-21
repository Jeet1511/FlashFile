import { Pool } from 'pg';
import { env } from './env';

export const pool = new Pool({
    connectionString: env.DATABASE_URL,
    ssl: env.DATABASE_URL.includes('neon.tech') ? { rejectUnauthorized: false } : false,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
});

export const connectDB = async (): Promise<void> => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT version()');
        console.log('✅ PostgreSQL connected:', result.rows[0].version.split(' ').slice(0, 2).join(' '));
        client.release();
    } catch (error: any) {
        console.error('❌ PostgreSQL connection error:', error.message);
        console.error('   Connection string host:', env.DATABASE_URL.split('@')[1]?.split('/')[0] || 'unknown');
        process.exit(1);
    }
};

export const initDB = async (): Promise<void> => {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS files (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      original_name VARCHAR(500) NOT NULL,
      stored_name VARCHAR(500) NOT NULL,
      size BIGINT NOT NULL,
      mime_type VARCHAR(255) NOT NULL,
      code VARCHAR(10) UNIQUE NOT NULL,
      uploaded_at TIMESTAMPTZ DEFAULT NOW(),
      expires_at TIMESTAMPTZ NOT NULL,
      ip_hash VARCHAR(64) NOT NULL,
      download_count INTEGER DEFAULT 0
    );

    CREATE INDEX IF NOT EXISTS idx_files_code ON files(code);
    CREATE INDEX IF NOT EXISTS idx_files_ip_hash ON files(ip_hash);
    CREATE INDEX IF NOT EXISTS idx_files_expires_at ON files(expires_at);
  `;

    try {
        await pool.query(createTableQuery);
        console.log('✅ Database tables initialized');
    } catch (error) {
        console.error('❌ Table creation error:', error);
        throw error;
    }
};
