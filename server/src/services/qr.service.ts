import QRCode from 'qrcode';

export const generateQR = async (url: string): Promise<string> => {
    try {
        const dataUrl = await QRCode.toDataURL(url, {
            width: 256,
            margin: 2,
            color: {
                dark: '#ffffff',
                light: '#00000000', // transparent background
            },
        });
        return dataUrl;
    } catch (error) {
        console.error('QR generation error:', error);
        throw new Error('Failed to generate QR code');
    }
};
