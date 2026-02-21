import React, { useState, useRef, useCallback } from 'react';
import { uploadFile } from '../api';
import { CheckCircle, Copy, Zap, Upload, Loader } from 'lucide-react';
import QRView from './QRView';

const UploadForm: React.FC = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (file: File) => {
        setIsUploading(true);
        setProgress(0);
        setError(null);
        setResult(null);

        const progressInterval = setInterval(() => {
            setProgress((prev) => Math.min(prev + Math.random() * 15, 90));
        }, 200);

        try {
            const data = await uploadFile(file);
            clearInterval(progressInterval);
            setProgress(100);
            setResult(data.file);
        } catch (err: any) {
            clearInterval(progressInterval);
            setError(err.message || 'Upload failed');
        } finally {
            setIsUploading(false);
        }
    };

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleUpload(file);
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleUpload(file);
    };

    const formatSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(result.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const resetForm = () => {
        setResult(null);
        setError(null);
        setProgress(0);
        setCopied(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    if (result) {
        return (
            <div className="upload-result">
                <div className="result-header">
                    <div className="success-icon">
                        <CheckCircle size={28} className="icon-scale-in" />
                    </div>
                    <h3>File Uploaded Successfully!</h3>
                </div>

                <div className="result-details">
                    <div className="detail-row">
                        <span className="detail-label">File</span>
                        <span className="detail-value">{result.originalName}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Size</span>
                        <span className="detail-value">{formatSize(result.size)}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Expires</span>
                        <span className="detail-value">
                            {new Date(result.expiresAt).toLocaleString()}
                        </span>
                    </div>
                </div>

                <div className="access-code-display">
                    <span className="code-label">Access Code</span>
                    <div className="code-value-large">{result.code}</div>
                    <button
                        className="btn btn-secondary btn-sm"
                        onClick={handleCopy}
                    >
                        <Copy size={14} />
                        {copied ? 'Copied!' : 'Copy Code'}
                    </button>
                </div>

                <QRView qrCode={result.qrCode} code={result.code} />

                <button className="btn btn-primary" onClick={resetForm}>
                    <Zap size={16} className="icon-pulse" />
                    Upload Another File
                </button>
            </div>
        );
    }

    return (
        <div className="upload-form">
            <div
                className={`drop-zone ${isDragging ? 'dragging' : ''} ${isUploading ? 'uploading' : ''}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => !isUploading && fileInputRef.current?.click()}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                />

                {isUploading ? (
                    <div className="upload-progress">
                        <Loader size={32} className="icon-spin" />
                        <p>Uploading...</p>
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <span className="progress-text">{Math.round(progress)}%</span>
                    </div>
                ) : (
                    <div className="drop-content">
                        <div className="drop-icon">
                            <Upload size={48} className="icon-float" />
                        </div>
                        <p className="drop-text">
                            <strong>Drop your file here</strong> or click to browse
                        </p>
                        <span className="drop-hint">Max 50 MB • Any file type</span>
                    </div>
                )}
            </div>

            {error && (
                <div className="error-message">
                    <span>{error}</span>
                    <button onClick={() => setError(null)}>✕</button>
                </div>
            )}
        </div>
    );
};

export default UploadForm;
