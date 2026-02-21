import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Image, Video, Music, FileText, Package, FileType, Paperclip, FolderOpen } from 'lucide-react';

interface FileItem {
    id: string;
    originalName: string;
    size: number;
    code: string;
    mimeType: string;
    uploadedAt: string;
    expiresAt: string;
    downloadCount: number;
}

interface FileListProps {
    files: FileItem[];
}

const FileList: React.FC<FileListProps> = ({ files }) => {
    const navigate = useNavigate();

    const formatSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    const getTimeLeft = (expiresAt: string) => {
        const diff = new Date(expiresAt).getTime() - Date.now();
        if (diff <= 0) return 'Expired';
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        if (hours > 0) return `${hours}h ${minutes}m`;
        return `${minutes}m`;
    };

    const getFileIcon = (mimeType: string) => {
        if (mimeType.startsWith('image/')) return <Image size={20} className="icon-breathe" />;
        if (mimeType.startsWith('video/')) return <Video size={20} className="icon-breathe" />;
        if (mimeType.startsWith('audio/')) return <Music size={20} className="icon-breathe" />;
        if (mimeType.includes('pdf')) return <FileText size={20} className="icon-breathe" />;
        if (mimeType.includes('zip') || mimeType.includes('rar') || mimeType.includes('tar')) return <Package size={20} className="icon-breathe" />;
        if (mimeType.includes('text')) return <FileType size={20} className="icon-breathe" />;
        return <Paperclip size={20} className="icon-breathe" />;
    };

    if (files.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-icon">
                    <FolderOpen size={48} className="icon-float" />
                </div>
                <h3>No files yet</h3>
                <p>Upload your first file to get started!</p>
            </div>
        );
    }

    return (
        <div className="file-list">
            {files.map((file, index) => (
                <div
                    key={file.id}
                    className="file-card"
                    onClick={() => navigate(`/file/${file.code}`)}
                    style={{ animationDelay: `${index * 0.05}s` }}
                >
                    <div className="file-icon">{getFileIcon(file.mimeType)}</div>
                    <div className="file-info">
                        <h4 className="file-name" title={file.originalName}>
                            {file.originalName}
                        </h4>
                        <div className="file-meta">
                            <span className="file-size">{formatSize(file.size)}</span>
                            <span className="file-separator">•</span>
                            <span className="file-downloads">
                                {file.downloadCount} download{file.downloadCount !== 1 ? 's' : ''}
                            </span>
                        </div>
                    </div>
                    <div className="file-right">
                        <div className="file-code">{file.code}</div>
                        <div className={`file-expiry ${getTimeLeft(file.expiresAt) === 'Expired' ? 'expired' : ''}`}>
                            {getTimeLeft(file.expiresAt)}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FileList;
