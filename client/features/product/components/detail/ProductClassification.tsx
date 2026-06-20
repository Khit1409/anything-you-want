import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import ProductClassificationValue from "./ProductClassificationValue";
import { useProductDetailContext } from "../../contexts/ProductDetailContext";

export default function ProductClassificationPreview() {
  const { product } = useProductDetailContext();
  const classifications = product!.classifications;
  return classifications.map((classification) => (
    <div className="py-4" key={classification.id}>
      <div className="flex items-center gap-3 mb-3">
        <FontAwesomeIcon icon={faTag} className="text-(--muted)" />
        <div className="text-sm font-semibold uppercase text-(--muted)">
          Phân loại
        </div>
        <div className="flex-1 h-px bg-(--border)" />
        <div className="text-sm font-semibold text-(--title)">
          {classification.name}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {classification.values.map((value) => (
          <ProductClassificationValue
            value={value}
            key={value.id}
            clsName={classification.name}
          />
        ))}
      </div>
    </div>
  ));
}
