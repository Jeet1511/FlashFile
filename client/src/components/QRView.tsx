import React from 'react';
import { ScanLine } from 'lucide-react';

interface QRViewProps {
    qrCode: string;
    code: string;
}

const QRView: React.FC<QRViewProps> = ({ qrCode, code }) => {
    return (
        <div className="qr-view">
            <div className="qr-image-wrapper">
                <img src={qrCode} alt={`QR Code for ${code}`} className="qr-image" />
            </div>
            <p className="qr-hint">
                <ScanLine size={14} className="icon-pulse" />
                Scan to download on any device
            </p>
        </div>
    );
};

export default QRView;
