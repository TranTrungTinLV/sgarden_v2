import axios from "axios";
import * as QRCode from "qrcode";
import * as pako from 'pako';
import {VietQR} from 'vietqr';
 


export async function generateVietQRCode(accountInfo): Promise<string> {
  const url = 'https://api.vietqr.io/v2/generate';
  const clientId = '904d1f14-eab6-4aa0-ae4d-bc11eeee7d08';
  const apiKey = '9c28db2d-a43b-4d77-a362-0a01668d6c6c';

  try {
    const response = await axios.post(url, accountInfo, {
      headers: {
        'x-client-id': clientId,
        'x-api-key': apiKey,
        'Content-Type': 'application/json'
      }
    });

    // Assuming the QR code data is directly in the response body
    // Adjust this line based on the actual structure of the response
    const qrCodeData = JSON.stringify(response.data); // Adjust this according to the actual response structure

    console.log('VietQR Code generated successfully:', qrCodeData);
    return qrCodeData; // Return only the QR code data
  } catch (error) {
    console.error('Error generating VietQR Code:', error);
    throw error;
  }
}
