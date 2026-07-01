"use client";

import useAppModal from "@/features/common/hooks/useAppModal";
import useLoading from "@/features/common/hooks/useLoading";
import { getOrderPaymentService } from "@/features/order/services/order.service";
import { PaymentLinkStatus } from "@/features/payments/interfaces/read.interface";
import { CreatePaymentLinkResponse } from "@/features/payments/interfaces/response.interface";
import { cancelPaymentService } from "@/features/payments/services/payment.service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const defaultPaymentData: CreatePaymentLinkResponse = {
  accountName: "",
  accountNumber: "",
  amount: 0,
  bin: "",
  checkoutUrl: "",
  currency: "",
  description: "",
  orderCode: 0,
  paymentLinkId: "",
  qrCode: "",
  status: PaymentLinkStatus.PENDING,
};

export default function useCheckout() {
  const params: { id: string } = useParams();
  const orderId = params.id;
  const {
    data = { orderId, paymentData: defaultPaymentData },
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["orderCheckout", orderId],
    queryFn: async () => {
      return await getOrderPaymentService(orderId);
    },
    enabled: !!orderId,
  });
  const { open } = useAppModal();
  const { handleLoading } = useLoading();

  async function cancel(cancellationReason?: string) {
    if (!data.paymentData) {
      return open({ message: "Dữ liệu thanh toán không tồn tại!" });
    }
    const { success, message } = await handleLoading(cancelPaymentService, {
      orderId,
      paymentLinkId: data.paymentData.paymentLinkId,
      cancellationReason,
    });

    return open({ success, message });
  }

  const { paymentData } = data;

  return { paymentData, isLoading, isError, cancel };
}
