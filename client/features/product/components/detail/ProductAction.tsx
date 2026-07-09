import { useProductDetailContext } from "../../contexts/ProductDetailContext";

export default function ProductAction() {
  const { sendCart, redirectToOrder } = useProductDetailContext();
  return (
    <div className="flex gap-3 mt-4">
      <button
        onClick={sendCart}
        id="add-cart-button"
        className="flex-1 py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md font-semibold shadow"
      >
        <span className="uppercase tracking-wide">Thêm vào giỏ</span>
      </button>

      <button
        onClick={redirectToOrder}
        className="flex-1 py-3 px-4 bg-transparent border border-(--border) rounded-md text-(--title) font-semibold hover:bg-(--surface-muted)"
      >
        <span className="uppercase tracking-wide">Mua ngay</span>
      </button>
    </div>
  );
}
