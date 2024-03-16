
  // src/modules/payment/payment.service.ts
import { Injectable } from '@nestjs/common';
import * as paypal from 'paypal-rest-sdk';
import { Response } from 'express';

@Injectable()
export class PaymentService {
  constructor() {
    paypal.configure({
        mode: 'sandbox', 
        client_id: 'AZlt-JQhX0L7AYRlLH2m2fEvLlw0jjZZ2eFhhi_xbkHtIstyFU8A8os3-F_giLe7MW-JoB8Jga5V8lm1',
        client_secret: 'EDOo3d87udCVa2ancIuvSWCymPCH0wdL3j_ViHvQKLTsRiOEe5sGJ6KoDWwtsxJEgUYmhPCS5fSx5c-o'
    });
  }

  async createPayment(totalPrice: number) {
    // Logic tạo payment ở đây
    // Sử dụng res để điều hướng người dùng đến URL thanh toán của PayPal
    const create_payment_json = {
        intent: 'sale',
    payer: {
      payment_method: 'paypal',
    },
    redirect_urls: {
      return_url: 'http://example.com/success',
      cancel_url: 'http://example.com/cancel',
    },
    transactions: [{
      amount: {
        currency: 'USD',
        total: totalPrice.toString(), // Tổng giá trị đơn hàng
      },
      description: 'Thanh toán đơn hàng của bạn tại sgarden.',
    }],
    }
    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        throw error;
      } else {
        console.log("thanh cong")
      }
    });
  }
}
