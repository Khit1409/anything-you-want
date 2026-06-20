import Link from "next/link";
import { CartResponse } from "../interfaces/cart.interface";

export default function CartInfoSection({ cart }: { cart: CartResponse }) {
  const { quantity, products, productId, totalPrice } = cart;
  const { name, category, sale, brand, origin, price } = products;

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
          <p className="text-(--muted) dark:text-gray-500 text-xs">Danh mục</p>
          <p className="font-medium dark:text-gray-200 text-sm">
            {category.name}
          </p>
        </div>
        <div>
          <p className="text-(--muted) dark:text-gray-500 text-xs">
            Thương hiệu
          </p>
          <p className="font-medium dark:text-gray-200 text-sm">{brand}</p>
        </div>
        <div>
          <p className="text-(--muted) dark:text-gray-500 text-xs">Xuất xứ</p>
          <p className="font-medium dark:text-gray-200 text-sm">{origin}</p>
        </div>
        <div>
          <p className="text-(--muted) dark:text-gray-500 text-xs">
            Khuyến mãi
          </p>
          <p className="font-medium dark:text-gray-200 text-sm text-orange-600 dark:text-orange-400 font-bold">
            -{sale}%
          </p>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded">
          <span className="text-(--muted) dark:text-gray-400 text-xs">SL:</span>
          <input
            type="number"
            defaultValue={Number(quantity)}
            min="1"
            className="w-12 px-1 py-0 text-center border-0 bg-transparent focus:outline-none dark:text-gray-100 font-medium"
          />
        </div>
        <div className="text-gray-500 dark:text-gray-400">
          <span className="text-xs">Giá:</span>
          <span className="font-medium dark:text-gray-200 ml-1">
            {Number(price).toLocaleString("vi-VN")}đ
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
      </div>
    </div>
  );
}
