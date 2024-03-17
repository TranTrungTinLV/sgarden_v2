import * as QRCode from "qrcode";

export async function generateQRCode(data: string, options?: QRCode.QRCodeToDataURLOptions): Promise<string> {
    try {
        // // Định nghĩa tùy chọn mặc định
        // const defaultOptions = {
        //     errorCorrectionLevel: 'H', // Chỉ định kiểu dữ liệu chính xác
        //     type: 'image/jpeg',
        //     quality: 0.3,
        //     margin: 1,
        //     color: {
        //         dark: "#000000",
        //         light: "#ffffff"
        //     }
        // };

        // // Gộp options
        // const mergedOptions = { ...defaultOptions, ...options };

        return QRCode.toDataURL(data);
    } catch (error) {
        console.error('Error generating QR Code', error);
        throw error;
    }
}
