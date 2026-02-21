const API_BASE = '/api';

export const uploadFile = async (file: File): Promise<any> => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        body: formData,
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Upload failed');
    }

    return res.json();
};

export const getFileByCode = async (code: string): Promise<any> => {
    const res = await fetch(`${API_BASE}/files/${code}`);

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'File not found');
    }

    return res.json();
};

export const getDownloadUrl = (code: string): string => {
    return `${API_BASE}/files/${code}/download`;
};

export const getDashboard = async (): Promise<any> => {
    const res = await fetch(`${API_BASE}/dashboard`);

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Dashboard load failed');
    }

    return res.json();
};
