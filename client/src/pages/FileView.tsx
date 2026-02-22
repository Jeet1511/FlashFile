import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFileByCode, getDownloadUrl } from '../api';
import { ArrowLeft, Loader, Search, Copy, Download, Image, Video, Music, FileText, Package, FileType, Paperclip } from 'lucide-react';
import Bee from '../components/Bee';
import QRView from '../components/QRView';

const FileView: React.FC = () => {
    const { code } = useParams<{ code: string }>();
    const [fileData, setFileData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

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
        if (hours > 0) return `${hours}h ${minutes}m remaining`;
        return `${minutes}m remaining`;
    };

    const getFileTypeIcon = (mimeType: string) => {
        if (mimeType.startsWith('image/')) return <Image size={32} className="icon-breathe" />;
        if (mimeType.startsWith('video/')) return <Video size={32} className="icon-breathe" />;
        if (mimeType.startsWith('audio/')) return <Music size={32} className="icon-breathe" />;
        if (mimeType.includes('pdf')) return <FileText size={32} className="icon-breathe" />;
        if (mimeType.includes('zip') || mimeType.includes('rar')) return <Package size={32} className="icon-breathe" />;
        if (mimeType.includes('text')) return <FileType size={32} className="icon-breathe" />;
        return <Paperclip size={32} className="icon-breathe" />;
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(fileData.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    useEffect(() => {
        const loadFile = async () => {
            if (!code) return;
            try {
                const data = await getFileByCode(code);
                setFileData(data.file);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadFile();
    }, [code]);

    return (
        <div className="page file-view-page">
            <nav className="top-nav">
                <Link to="/" className="nav-brand">
                    <Bee size={20} className="icon-bee-buzz" />
                    Mask Bee
                </Link>
                <Link to="/" className="btn btn-secondary btn-sm">
                    <ArrowLeft size={14} />
                    Back to Home
                </Link>
            </nav>

            {loading ? (
                <div className="loading-state">
                    <Loader size={48} className="icon-spin" />
                    <p>Looking up file...</p>
                </div>
            ) : error ? (
                <div className="error-state glass-card">
                    <div className="error-icon">
                        <Search size={48} className="icon-float" />
                    </div>
                    <h2>File Not Found</h2>
                    <p>{error}</p>
                    <p className="error-hint">
                        The file may have expired or the code might be incorrect.
                    </p>
                    <Link to="/" className="btn btn-primary">
                        <ArrowLeft size={16} />
                        Go Home
                    </Link>
                </div>
            ) : fileData ? (
                <div className="file-view-content">
                    <div className="file-view-card glass-card">
                        <div className="file-view-header">
                            <div className="file-type-icon large">
                                {getFileTypeIcon(fileData.mimeType)}
                            </div>
                            <div>
                                <h2 className="file-view-name">{fileData.originalName}</h2>
                                <div className="file-view-meta">
                                    <span>{formatSize(fileData.size)}</span>
                                    <span className="meta-dot">•</span>
                                    <span>{fileData.mimeType}</span>
                                    <span className="meta-dot">•</span>
                                    <span>{fileData.downloadCount} download{fileData.downloadCount !== 1 ? 's' : ''}</span>
                                </div>
                            </div>
                        </div>

                        <div className="file-view-details">
                            <div className="detail-row">
                                <span className="detail-label">Access Code</span>
                                <div className="detail-value code-value">
                                    <span>{fileData.code}</span>
                                    <button
                                        className="btn-icon"
                                        onClick={handleCopy}
                                        title="Copy code"
                                    >
                                        <Copy size={14} />
                                    </button>
                                    {copied && <span className="copy-feedback">Copied!</span>}
                                </div>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Uploaded</span>
                                <span className="detail-value">
                                    {new Date(fileData.uploadedAt).toLocaleString()}
                                </span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Expires</span>
                                <span className={`detail-value ${getTimeLeft(fileData.expiresAt) === 'Expired' ? 'text-danger' : 'text-success'}`}>
                                    {getTimeLeft(fileData.expiresAt)}
                                </span>
                            </div>
                        </div>

                        <a
                            href={getDownloadUrl(fileData.code)}
                            className="btn btn-primary btn-lg download-btn"
                            download
                        >
                            <Download size={20} className="icon-float" />
                            Download File
                        </a>

                        <QRView qrCode={fileData.qrCode} code={fileData.code} />
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default FileView;
