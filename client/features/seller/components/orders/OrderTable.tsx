import { useManagerOrderContext } from "../../contexts/ManagerOrderContext";
import { SectionShowDataLoading } from "@/features/common/components";
import {
  generateOrderStatus,
  generatePaymentType,
} from "@/features/common/helpers/enum-type.helper";

export default function OrderTable() {
  const { isLoading, orders, renderShippingCol, renderOrderTime } =
    useManagerOrderContext();
  if (isLoading) {
    return <SectionShowDataLoading />;
  }

  return (
    <div className="w-screen h-100">
      <div className="bg-white border border-zinc-200 rounded-xl h-full flex flex-col w-255">
        <div className="px-5 py-4 border-b border-zinc-100">
          <h2 className="text-sm font-semibold text-zinc-700">
            Đơn hàng gần đây
          </h2>
        </div>
        <div className="w-full flex-1 overflow-auto">
          <table className="text-sm w-full">
            <thead>
              <tr className="border-b border-zinc-100">
                {[
                  "Mã đơn",
                  "Khách hàng",
                  "Sản phẩm",
                  "Tổng tiền",
                  "Vận chuyển",
                  "Thanh toán",
                  "Trạng thái",
                  "Thời gian",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="">
              {orders.map((order, i) => (
                <tr
                  key={order.id}
                  className={
                    i !== orders.length - 1 ? "border-b border-zinc-50" : ""
                  }
                >
                  <td className="px-5 py-3.5 text-zinc-500 font-mono text-xs">
                    #{order.orderCode}
                  </td>
                  <td className="px-5 py-3.5 text-zinc-700 text-nowrap font-medium">
                    {order.contact.userName}
                  </td>
                  <td className="px-5 py-3.5 text-zinc-500">
                    <span className="truncate w-50">{order.name}</span>
                  </td>
                  <td className="px-5 py-3.5 text-zinc-700 text-nowrap">
                    {order.totalPrice.toLocaleString("vi-VN")}
                  </td>
                  <td className="px-5 py-3.5 text-zinc-700 text-nowrap">
                    {renderShippingCol(order.shipping)}
                  </td>
                  <td className="px-5 py-3.5 text-zinc-700 text-nowrap">
                    {generatePaymentType(order.payment.type)}
                  </td>
                  <td className="px-5 py-3.5 text-nowrap text-zinc-700">
                    {generateOrderStatus(order.status)}
                  </td>
                  <td className="px-5 py-3.5 text-zinc-700 text-nowrap">
                    {renderOrderTime(order.createdAt, order.updatedAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
