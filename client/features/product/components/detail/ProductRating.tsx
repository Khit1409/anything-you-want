import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useProductDetailContext } from "../../contexts/ProductDetailContext";

export default function ProductRatingSection() {
  const { product } = useProductDetailContext();
  if (!product) return null;
  const { ratingSumary } = product;
  return (
    <div className="flex items-center gap-3 py-3 px-4 bg-(--surface-muted) rounded-md">
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon={faStar} className="text-yellow-500 text-lg" />
        <div className="text-sm font-semibold">
          {ratingSumary.avg.toFixed?.(1) ?? "-"}
        </div>
      </div>

      <div className="text-sm text-(--muted)">
        ({ratingSumary.total} đánh giá)
      </div>
    </div>
  );
}
