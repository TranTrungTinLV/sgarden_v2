import axios from "axios";


export async function registerWebhook() {
    const webhookUrl = 'https://webhook.site/f5708208-2330-4fae-9d58-92e4def58a5f';
    const clientId = '904d1f14-eab6-4aa0-ae4d-bc11eeee7d08';
    const apiKey = '9c28db2d-a43b-4d77-a362-0a01668d6c6c';
    try {
        const response = await axios.post('https://api.vietqr.io/v2/paymentGateway/confirmWebhook', {
            webhook_url: webhookUrl
        },{headers:{
            'x-client-id': clientId,
            'x-api-key': apiKey,
            'Content-Type': 'application/json'
        }});
        console.log('Thành công', response.data);
    }catch(e){
        console.log(e)
        console.log("lỗi webhook",e)
    }
}