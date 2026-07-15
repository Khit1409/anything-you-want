import ProductClassificationValue from "./ProductClassificationValue";
import { useProductDetailContext } from "../../contexts/ProductDetailContext";

export default function ProductClassificationPreview() {
  const { product } = useProductDetailContext();
  const classifications = product!.classifications;
  return (
    <div className="flex flex-col gap-3">
      {classifications.map((classification) => (
        <div className="py-2" key={classification.id}>
          <div className="flex items-center gap-3 mb-3">
            <div className="text-sm uppercase text-(--muted)">
              {classification.name}
            </div>
            <div className="flex-1 h-px bg-(--border)" />
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
      ))}
    </div>
  );
}
