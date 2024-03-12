import * as QRCode from "qrcode";

export async function generateQRCode(data: string): Promise<string> {
    try {
        return await QRCode.toDataURL(data)
    }catch(error){
        console.error('Error generating QR Code',error);
        throw error;
    }
}

