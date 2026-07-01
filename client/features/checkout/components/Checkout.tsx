import { QRCode } from "react-qr-code";
import useCheckout from "../hooks/useCheckout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { SectionShowDataLoading } from "@/features/common/components";
import NotFoundCheckout from "./NotFoundCheckout";

export default function Checkout() {
  const { paymentData, isLoading, cancel } = useCheckout();
  if (isLoading) {
    return <SectionShowDataLoading />;
  }
  if (!paymentData) return <NotFoundCheckout />;
  const {
    qrCode,
    accountName,
    accountNumber,
    amount,
    checkoutUrl,
    description,
  } = paymentData;
  const endTime = paymentData.expiredAt
    ? new Date(paymentData.expiredAt * 1000).toString()
    : undefined;
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        {/* Header Section */}
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 mb-8 flex items-start gap-4">
          <div className="shrink-0 mt-1">
            <FontAwesomeIcon
              icon={faLightbulb}
              className="text-blue-600 text-xl"
            />
          </div>
          <div>
            <p className="text-gray-800">
              Mở app Ngân hàng bất kỳ để
              <strong className="text-gray-900">quét mã thanh toán</strong> hoặc
              <strong className="text-gray-900">chuyển khoản thủ công</strong>
            </p>
            {endTime && (
              <p className="text-gray-900">Thanh toán trước {endTime}</p>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - QR Code */}
          <div className="flex flex-col items-center">
            <div className="bg-white rounded-lg shadow-md p-6 w-full mb-6">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <QRCode value={qrCode} size={256} level="H" />
                </div>
              </div>
              <p className="text-center text-sm text-gray-600 mb-1">
                Quét mã QR để thanh toán
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Link
                href={checkoutUrl}
                className="flex-1 px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 text-center"
              >
                Thanh toán bằng PayOS
              </Link>
              <button
                onClick={() => cancel()}
                className="px-4 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
              >
                Hủy
              </button>
            </div>
          </div>

          {/* Right Column - Payment Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              Thông tin thanh toán
            </h2>

            {/* Detail Items */}
            <div className="space-y-5">
              {/* Account Name */}
              <div className="pb-4 border-b border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Chủ tài khoản</p>
                <p className="text-lg font-semibold text-gray-900">
                  {accountName}
                </p>
              </div>

              {/* Account Number */}
              <div className="pb-4 border-b border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Số tài khoản</p>
                <p className="text-lg font-semibold text-gray-900 font-mono">
                  {accountNumber}
                </p>
              </div>

              {/* Amount */}
              <div className="pb-4 border-b border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Số tiền</p>
                <p className="text-2xl font-bold text-blue-600">{amount}</p>
              </div>

              {/* Description */}
              <div className="pb-4">
                <p className="text-sm text-gray-600 mb-1">
                  Nội dung chuyển khoản
                </p>
                <p className="text-base font-medium text-gray-900 wrap-break-words">
                  {description}
                </p>
              </div>
            </div>

            {/* Warning Notice */}
            <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-4">
              <div className="flex gap-3">
                <div className="shrink-0">
                  <span className="text-yellow-600 text-xl">⚠️</span>
                </div>
                <div>
                  <p className="text-sm text-yellow-800">
                    <strong>Lưu ý:</strong> Vui lòng chuyển khoản đúng số tiền
                    và nội dung để tránh sai sót.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
