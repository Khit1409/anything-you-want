interface Props {
  price: number;
  sale: number;
}

export default function Price({ price, sale }: Props) {
  const finalPrice = price - (price * sale) / 100;

  return (
    <div className="flex items-center justify-around gap-2">
      <span className="text-xs text-gray-500 dark:text-(--text) line-through">
        {price.toLocaleString("vi-VN")}
      </span>
      <span className="text-xl font-normal text-red-500">
        {finalPrice.toLocaleString("vi-VN")} ₫
      </span>
    </div>
  );
}
