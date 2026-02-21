export interface FileRecord {
    id: string;
    originalName: string;
    storedName: string;
    size: number;
    mimeType: string;
    code: string;
    uploadedAt: Date;
    expiresAt: Date;
    ipHash: string;
    downloadCount: number;
}

export interface UploadResponse {
    success: boolean;
    file: {
        id: string;
        originalName: string;
        size: number;
        code: string;
        qrCode: string;
        expiresAt: string;
    };
}

export interface FileAccessResponse {
    success: boolean;
    file: {
        id: string;
        originalName: string;
        size: number;
        mimeType: string;
        code: string;
        qrCode: string;
        uploadedAt: string;
        expiresAt: string;
        downloadCount: number;
    };
}

export interface DashboardStats {
    totalFiles: number;
    totalSize: number;
    totalDownloads: number;
}

export interface DashboardResponse {
    success: boolean;
    stats: DashboardStats;
    files: FileRecord[];
}

export interface ApiError {
    success: false;
    error: string;
}
