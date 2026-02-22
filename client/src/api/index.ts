const API_BASE = import.meta.env.PROD
    ? 'https://mask-bee.onrender.com/api'
    : '/api';

export const uploadFile = async (file: File): Promise<any> => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        body: formData,
    });

    if (!res.ok) {
        const text = await res.text();
        try {
            const err = JSON.parse(text);
            throw new Error(err.error || 'Upload failed');
        } catch {
            throw new Error('Server is not reachable. Make sure the server is running.');
        }
    }

    return res.json();
};

export const getFileByCode = async (code: string): Promise<any> => {
    const res = await fetch(`${API_BASE}/files/${code}`);

    if (!res.ok) {
        const text = await res.text();
        try {
            const err = JSON.parse(text);
            throw new Error(err.error || 'File not found');
        } catch {
            throw new Error('Server is not reachable. Make sure the server is running.');
        }
    }

    return res.json();
};

export const getDownloadUrl = (code: string): string => {
    return `${API_BASE}/files/${code}/download`;
};

export const getDashboard = async (): Promise<any> => {
    const res = await fetch(`${API_BASE}/dashboard`);

    if (!res.ok) {
        const text = await res.text();
        try {
            const err = JSON.parse(text);
            throw new Error(err.error || 'Dashboard load failed');
        } catch {
            throw new Error('Server is not reachable. Make sure the server is running.');
        }
    }

    return res.json();
};
