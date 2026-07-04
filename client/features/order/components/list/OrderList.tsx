import { SectionShowDataLoading } from "@/features/common/components";
import { useOrderListContext } from "../../contexts/OrderListContext";
import EmptyOrder from "./EmptyOrder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faHashtag,
  faTag,
  faLayerGroup,
  faCoins,
  faPercent,
  faLocationDot,
  faUser,
  faPhone,
  faEnvelope,
  faCalendarPlus,
  faCalendarCheck,
  faStore,
  faShippingFast,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";

export default function OrderList() {
  const { orders, isLoading, status, shipping } = useOrderListContext();

  if (isLoading) {
    return <SectionShowDataLoading />;
  }
  if (orders.length == 0) {
    return <EmptyOrder />;
  }

  return (
    <div className="flex flex-col gap-4 p-6">
      {orders.map((order) => (
        <div
          key={order.id}
          className="relative rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          {/* Góc phải trên: createdAt / updatedAt */}
          <div className="absolute right-4 top-4 flex flex-col items-end gap-1 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <FontAwesomeIcon icon={faCalendarPlus} className="w-3 h-3" />
              <span>{order.createdAt}</span>
            </div>
            <div className="flex items-center gap-1">
              <FontAwesomeIcon icon={faCalendarCheck} className="w-3 h-3" />
              <span>{order.updatedAt}</span>
            </div>
          </div>

          {/* Nội dung chính: 4 section flex ngang */}
          <div className="flex items-start gap-6 pr-28">
            {/* 1. Thumbnail */}
            <div className="shrink-0">
              <Image
                src={order.thumbnail}
                alt={order.name}
                className="w-24 h-24 rounded-lg object-cover border border-gray-100"
                width={96}
                height={96}
              />
            </div>

            {/* 2. Info */}
            <div className="flex flex-col gap-1.5 min-w-55">
              <span className="font-semibold text-gray-900 text-sm line-clamp-2">
                {order.name}
              </span>

              <Link
                href={`/stores/${order.store.id}`}
                className="flex items-center gap-1.5 text-xs text-gray-500"
              >
                <FontAwesomeIcon icon={faStore} />
                <span>Cửa hàng: {order.store.info.name}</span>
              </Link>

              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <FontAwesomeIcon icon={faHashtag} className="w-3 h-3" />
                <span>Mã đơn: {order.orderCode}</span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <FontAwesomeIcon icon={faTag} className="w-3 h-3" />
                <span>SKU: {order.sku}</span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <FontAwesomeIcon icon={faBoxOpen} className="w-3 h-3" />
                <Link
                  href={`/products/${order.productId}`}
                  className="text-blue-500 hover:underline"
                >
                  Chi tiết sản phẩm
                </Link>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <FontAwesomeIcon icon={faLayerGroup} className="w-3 h-3" />
                <span>Số lượng: {order.quantity}</span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <FontAwesomeIcon icon={faCoins} className="w-3 h-3" />
                <span>
                  Giá: {order.price} &nbsp;|&nbsp; Tổng: {order.totalPrice}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <FontAwesomeIcon icon={faPercent} className="w-3 h-3" />
                <span>Giảm giá: {order.sale}</span>
              </div>

              <span className="mt-1 inline-block w-fit rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
                {status(order.status)}
              </span>
            </div>

            {/* 3. Address */}
            <div className="flex flex-col gap-1.5 min-w-50 border-l border-gray-100 pl-6">
              <div className="flex items-center gap-1.5 text-xs font-medium text-gray-700">
                <FontAwesomeIcon icon={faLocationDot} className="w-3 h-3" />
                <span>Địa chỉ</span>
              </div>
              <span className="text-xs text-gray-500">
                {order.address.detail}
              </span>
              <span className="text-xs text-gray-500">
                {order.address.ward}
              </span>
              <span className="text-xs text-gray-500">
                {order.address.province}
              </span>
            </div>

            {/*4. Vận chuyển */}
            <div className="flex flex-col gap-1.5 min-w-50 border-l border-gray-100 pl-6">
              <div className="flex items-center gap-1.5 text-xs text-gray-700">
                <FontAwesomeIcon icon={faShippingFast} className="w-3 h-3" />
                <span>Vận chuyển</span>
              </div>
              <span className="text-xs text-gray-500">
                {shipping(order.shipping.type)}
              </span>
            </div>

            {/* 5 . Contact */}
            <div className="flex flex-col gap-1.5 min-w-50 border-l border-gray-100 pl-6">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <FontAwesomeIcon icon={faUser} className="w-3 h-3" />
                <span>{order.contact.userName}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <FontAwesomeIcon icon={faPhone} className="w-3 h-3" />
                <span>{order.contact.phone}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <FontAwesomeIcon icon={faEnvelope} className="w-3 h-3" />
                <span>{order.contact.email}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
