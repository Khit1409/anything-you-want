interface Props {
  price: number;
  sale: number;
}

export default function Price({ price, sale }: Props) {
  const finalPrice = price - (price * sale) / 100;
  const save = (price * sale) / 100;

  return (
    <div className="mb-3">
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-2xl font-normal text-red-500">
          {finalPrice.toLocaleString("vi-VN")}
        </span>
        <span className="text-sm text-(--product-price) dark:text-(--product-price)">
          ₫
        </span>
      </div>
      {sale > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-(--text) line-through">
            {price.toLocaleString("vi-VN")}
          </span>
          <span className="text-xs text-red-600 dark:text-red-400 font-medium">
            Tiết kiệm {save.toLocaleString("vi-VN")}₫
          </span>
        </div>
      )}
    </div>
  );
}
