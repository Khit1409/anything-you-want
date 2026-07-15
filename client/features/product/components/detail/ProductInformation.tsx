import { useProductDetailContext } from "../../contexts/ProductDetailContext";

export default function ProductInformation() {
  const { product } = useProductDetailContext();
  if (!product) return null;
  const { category, name, price, sale, brand, origin } = product?.info;

  const discounted = price - (price * sale) / 100;
  const savedPrice = price - discounted;

  return (
    <div className="bg-(--surface) rounded-md">
      <h2 className="text-2xl font-bold text-(--title) mb-2">{name}</h2>

      <div className="flex items-center gap-3 text-sm text-(--muted) mb-4">
        <span className="font-medium text-(--text)">{brand}</span>
        <span className="px-2 text-xs bg-(--surface-muted) rounded">
          {category.name}
        </span>
        {origin && <span className="ml-auto text-xs">Xuất xứ: {origin}</span>}
      </div>

      <div className="flex items-end gap-4 mb-4">
        <div className="text-3xl font-extrabold text-(--title)">
          {discounted.toLocaleString("vi-VN")}₫
        </div>
        <div className="text-sm text-(--muted) line-through">
          {price.toLocaleString("vi-VN")}₫
        </div>
        <div className="ml-2 px-2 py-1 bg-red-500 text-white rounded text-sm">
          -{sale}%
        </div>
      </div>

      <div className="text-sm text-(--muted)">
        Tiết kiệm: {savedPrice.toLocaleString("vi-VN")}₫
      </div>
    </div>
  );
}
