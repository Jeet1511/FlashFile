import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, KeyRound, Shield, Clock, QrCode, ArrowRight, Github, Instagram, LayoutDashboard } from 'lucide-react';
import Bee from '../components/Bee';
import UploadForm from '../components/UploadForm';
import CodeAccess from '../components/CodeAccess';

const Home: React.FC = () => {
    return (
        <div className="page home-page">
            <nav className="top-nav">
                <Link to="/" className="nav-brand">
                    <Bee size={20} className="icon-bee-buzz" />
                    Mask Bee
                </Link>
                <Link to="/dashboard" className="btn btn-secondary btn-sm">
                    <LayoutDashboard size={16} />
                    Dashboard
                </Link>
            </nav>

            <section className="hero">
                <div className="hero-glow"></div>
                <div className="hero-content">
                    <div className="hero-badge">
                        <Bee size={14} className="icon-bee-buzz" />
                        Instant File Sharing
                    </div>
                    <h1 className="hero-title">
                        Share files with <span className="gradient-text">Mask Bee</span>
                    </h1>
                    <p className="hero-subtitle">
                        Upload any file, get a short code & QR. No sign-up, no hassle.
                        Files expire automatically.
                    </p>
                </div>
            </section>

            <section className="main-section">
                <div className="two-col">
                    <div className="col col-upload">
                        <div className="section-label">
                            <Upload size={18} className="icon-float" />
                            Upload a file
                        </div>
                        <UploadForm />
                    </div>
                    <div className="col col-access">
                        <div className="section-label">
                            <KeyRound size={18} className="icon-float" />
                            Access a file
                        </div>
                        <CodeAccess />
                    </div>
                </div>
            </section>

            <section className="features">
                <div className="feature-grid">
                    <div className="feature-card">
                        <div className="feature-icon-wrapper">
                            <Shield size={28} className="icon-breathe" />
                        </div>
                        <h3>Privacy First</h3>
                        <p>No accounts needed. Files are tied to your session via hashed IP.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon-wrapper">
                            <Clock size={28} className="icon-spin-slow" />
                        </div>
                        <h3>Auto Expire</h3>
                        <p>Files automatically vanish after 24 hours. Clean & temporary.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon-wrapper">
                            <QrCode size={28} className="icon-breathe" />
                        </div>
                        <h3>QR Code</h3>
                        <p>Every upload gets a QR code. Perfect for phone-to-PC transfers.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon-wrapper">
                            <Bee size={28} className="icon-bee-buzz" />
                        </div>
                        <h3>Lightning Fast</h3>
                        <p>Upload and share in seconds. No waiting, no compression.</p>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-brand-row">
                        <Bee size={18} className="icon-bee-buzz" />
                        <span className="footer-brand">Mask Bee</span>
                    </div>
                    <span className="footer-copy">Temporary file sharing. No sign-up required.</span>
                    <div className="footer-links">
                        <Link to="/dashboard" className="footer-link">Dashboard</Link>
                    </div>
                </div>

                <div className="footer-creator">
                    <span className="creator-label">Created by</span>
                    <div className="creator-links">
                        <a
                            href="https://www.instagram.com/_echo.del.alma_"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="creator-link instagram-link"
                        >
                            <Instagram size={18} className="icon-float" />
                            <span>@_echo.del.alma_</span>
                            <ArrowRight size={14} className="link-arrow" />
                        </a>
                        <a
                            href="https://github.com/Jeet1511"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="creator-link github-link"
                        >
                            <Github size={18} className="icon-float" />
                            <span>Jeet1511</span>
                            <ArrowRight size={14} className="link-arrow" />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
