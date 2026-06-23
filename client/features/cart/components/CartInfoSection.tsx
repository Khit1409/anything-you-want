import Link from "next/link";
import { CartResponse } from "../interfaces/cart.interface";

export default function CartInfoSection({ cart }: { cart: CartResponse }) {
  const { product, createdAt, updatedAt } = cart;
  const {
    quantity,
    productId,
    totalPrice,
    sale,
    price,
    name,
    discounted,
    sku,
  } = product;
  const dayAdd = new Date(createdAt).toLocaleDateString("vi-VN");
  const lastUpdate = new Date(updatedAt).toLocaleDateString("vi-VN");
  return (
    <div className="flex flex-col justify-between h-full">
      {/* Product Name - Clickable */}

      <Link href={`/products/${productId}`}>
        <h3 className="text-base font-semibold text-(--title) dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2 cursor-pointer">
          {name}
        </h3>
      </Link>

      {/* Product Details Grid - Compact */}
      <div className="grid grid-cols-4 gap-3 text-xs my-2">
        <div>
          <p className="text-(--muted) dark:text-gray-500 text-xs">Giá gốc</p>
          <p className="font-medium dark:text-gray-200 text-sm text-orange-600">
            {price.toLocaleString("vi-VN")}
          </p>
        </div>
        <div>
          <p className="text-(--muted) dark:text-gray-500 text-xs">
            Khuyến mãi
          </p>
          <p className="font-medium dark:text-gray-200 text-sm text-orange-600">
            -{sale}%
          </p>
        </div>
        <div>
          <p className="text-(--muted) dark:text-gray-500 text-xs">Đã trừ</p>
          <p className="font-medium dark:text-gray-200 text-sm text-orange-600">
            {(price - discounted).toLocaleString("vi-VN")}
          </p>
        </div>
        <div>
          <p className="text-(--muted) dark:text-gray-500 text-xs">Còn lại</p>
          <p className="font-medium dark:text-gray-200 text-sm text-orange-600">
            {discounted.toLocaleString("vi-VN")}
          </p>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="flex items-center gap-5 text-sm">
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded">
          <span className="text-(--muted) dark:text-gray-400 text-xs">
            SL x {quantity}
          </span>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded">
          <span className="text-(--muted) dark:text-gray-400 text-xs">
            {sku}
          </span>
        </div>
      </div>

      {/* Total Price - Prominent */}
      <div className="flex items-center gap-2 mt-1">
        <span className="text-xs text-(--muted) dark:text-gray-400">
          Thành tiền:
        </span>
        <span className="text-lg font-bold text-red-600 dark:text-red-400">
          {Number(totalPrice).toLocaleString("vi-VN")}₫
        </span>
        <small>ngày thêm - {dayAdd}</small>
        <small>lần cập nhật cuối - {lastUpdate}</small>
      </div>
    </div>
  );
}
