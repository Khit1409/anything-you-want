import {
  OrderStatus,
  PaymentStatus,
} from "@/features/order/interfaces/read.interface";
import { useManagerOrderContext } from "../../contexts/ManagerOrderContext";
import {
  generateOrderStatus,
  generatePaymentStatus,
} from "@/features/common/helpers/enum-type.helper";

export default function FilterOrderBar() {
  const { filter, onChangeOrderFilter } = useManagerOrderContext();
  const statusArr = Object.values(OrderStatus);
  const paymentStatusArr = Object.values(PaymentStatus);
  const { paymentStatus, status } = filter;
  return (
    <div className="p-4 mb-3 border border-(--border) rounded flex justify-evenly items-center">
      <div className="text-gray-700 flex gap-3 items-center">
        <label htmlFor="status" className="font-semibold text-gray-800">
          Trạng thái đơn hàng
        </label>
        <select
          name="status"
          id="status"
          onChange={(e) => onChangeOrderFilter(e)}
          value={status}
          className="border border-(--border) rounded p-2 outline-0 text-center"
        >
          {statusArr.map((status) => (
            <option value={status} key={status}>
              {generateOrderStatus(status)}
            </option>
          ))}
        </select>
      </div>
      <div className="text-gray-700 flex gap-3 items-center">
        <label htmlFor="status" className="font-semibold text-gray-800">
          Trạng thanh toán
        </label>
        <select
          name="paymentStatus"
          id="paymentStatus"
          value={paymentStatus}
          onChange={(e) => onChangeOrderFilter(e)}
          className="border border-(--border) rounded p-2 outline-0 text-center"
        >
          {paymentStatusArr.map((status) => (
            <option value={status} key={status}>
              {generatePaymentStatus(status)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
