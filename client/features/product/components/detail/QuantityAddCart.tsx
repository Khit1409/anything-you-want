import React from "react";
import { useProductDetailContext } from "../../contexts/ProductDetailContext";

export default function QuantityAddCart() {
  const { setQuantity, quantity, maxQuantity } = useProductDetailContext();
  return (
    <div className="flex items-center gap-3 mt-3">
      <span className="text-sm text-(--muted)">Số lượng</span>
      <small className="text-(--text)">
        {maxQuantity() && `Giới hạn : ${maxQuantity()}`}
      </small>
      <div className="flex items-center border border-(--border) rounded">
        <button
          className="px-3 py-2 hover:bg-(--surface-muted)"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
        >
          -
        </button>
        <input
          type="number"
          value={quantity}
          min={1}
          max={maxQuantity()}
          onChange={(e) => setQuantity(Number(e.target.value) || 1)}
          className="w-16 text-center outline-none"
        />
        <button
          disabled={quantity == maxQuantity()}
          className="px-3 py-2 hover:bg-(--surface-muted)"
          onClick={() => setQuantity(quantity + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
}
