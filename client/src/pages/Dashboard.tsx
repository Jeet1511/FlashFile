import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDashboard } from '../api';
import { Zap, ArrowLeft, Loader, AlertTriangle, Files, HardDrive, Download } from 'lucide-react';
import FileList from '../components/FileList';

const Dashboard: React.FC = () => {
    const [stats, setStats] = useState({ totalFiles: 0, totalSize: 0, totalDownloads: 0 });
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const formatSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
        return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
    };

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const data = await getDashboard();
                setStats(data.stats);
                setFiles(data.files);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, []);

    return (
        <div className="page dashboard-page">
            <nav className="top-nav">
                <Link to="/" className="nav-brand">
                    <Zap size={20} className="icon-pulse" />
                    FlashFile
                </Link>
                <Link to="/" className="btn btn-secondary btn-sm">
                    <ArrowLeft size={14} />
                    Back to Home
                </Link>
            </nav>

            <div className="dashboard-header">
                <h1>Your Dashboard</h1>
                <p className="dashboard-subtitle">
                    Files uploaded from this device. Data is session-based.
                </p>
            </div>

            {loading ? (
                <div className="loading-state">
                    <Loader size={48} className="icon-spin" />
                    <p>Loading your files...</p>
                </div>
            ) : error ? (
                <div className="error-state">
                    <AlertTriangle size={32} className="icon-breathe" />
                    <p>{error}</p>
                    <p className="error-hint">Make sure the server is running on port 5000.</p>
                </div>
            ) : (
                <>
                    <div className="stats-bar">
                        <div className="stat-card">
                            <div className="stat-icon"><Files size={22} className="icon-float" /></div>
                            <div className="stat-value">{stats.totalFiles}</div>
                            <div className="stat-label">Files</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon"><HardDrive size={22} className="icon-float" /></div>
                            <div className="stat-value">{formatSize(stats.totalSize)}</div>
                            <div className="stat-label">Total Size</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon"><Download size={22} className="icon-float" /></div>
                            <div className="stat-value">{stats.totalDownloads}</div>
                            <div className="stat-label">Downloads</div>
                        </div>
                    </div>

                    <FileList files={files} />
                </>
            )}
        </div>
    );
};

export default Dashboard;
