import { IPaymentResponse } from "@/types/payment.inteface";

import { instance } from "@/api/api.interceptor";

export const PaymentService = {
  async createPayment(orderId: number): Promise<IPaymentResponse> {
    const { data } = await instance.post<IPaymentResponse>(
      "/payment/create",
      { orderId }
    );
    return data;
  },
};