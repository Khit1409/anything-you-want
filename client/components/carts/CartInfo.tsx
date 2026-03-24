import { CartItemResponse } from "@/interfaces/response/cart.response";
import Link from "next/link";

interface Props {
  cartId: string;
  items: CartItemResponse;
  onchangeQuantity: ({
    id,
    e,
  }: {
    id: string;
    e: React.ChangeEvent<HTMLInputElement>;
  }) => void;
}
export default function CartInfo({ items, onchangeQuantity, cartId }: Props) {
  return (
    <div className="flex-1">
      <div className="mb-4 flex justify-between items-start">
        <Link
          href={`/products/${items.productId}`}
          className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
        >
          {items.name}
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div className="flex items-center gap-2">
          <span className="text-gray-600 font-medium">Thương hiệu:</span>
          <span className="text-gray-900">{items.brand}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600 font-medium">Xuất xứ:</span>
          <span className="text-gray-900">{items.origin}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600 font-medium">Giá gốc:</span>
          <span className="text-gray-900">
            {items.originPrice.toLocaleString("vi-VN")} đ
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600 font-medium">Tổng giá:</span>
          <span className="text-red-600 font-semibold">
            {items.totalPrice.toLocaleString("vi-VN")} đ
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600 font-medium">Khuyến mại:</span>
          <span className="text-red-500 font-bold">{items.sale} %</span>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="quantity" className="text-gray-600 font-medium">
            Số Lượng:
          </label>
          <input
            className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="number"
            onChange={(e) => {
              onchangeQuantity({ id: cartId, e });
            }}
            defaultValue={Number(items.quantity)}
            id="quantity"
            name="quantity"
            min="1"
          />
        </div>
      </div>
    </div>
  );
}
