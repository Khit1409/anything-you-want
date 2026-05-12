import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { ProductClassification } from "@/interfaces/product.interface";
import { CartClassificationRequest } from "@/interfaces/cart.interface";
import ProductClassificationValue from "./ProductClassificationValue";

type OnchangeClassificationType = {
  name: string;
  value: string;
};

interface Props {
  classification: Array<ProductClassification>;
  classificationSelected: CartClassificationRequest[];
  onchangeClassification: ({ name, value }: OnchangeClassificationType) => void;
}

export default function ProductClassificationPreview(props: Props) {
  const { classification, onchangeClassification, classificationSelected } =
    props;

  return (
    <div className="flex flex-col divide-y divide-zinc-100 p-4">
      {classification.map((classifi) => (
        <div key={classifi.name} className="py-5 first:pt-0 last:pb-0">
          {/* Label */}
          <div className="flex items-center gap-2 mb-4">
            <FontAwesomeIcon
              icon={faTag}
              className="text-zinc-400 text-[15px]"
            />
            <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-zinc-400">
              Phân loại
            </span>
            <span className="h-px flex-1 bg-zinc-100" />
            <span className="font-semibold text-zinc-800 tracking-wide uppercase">
              {classifi.name}
            </span>
          </div>

          {/* Values component */}
          <ProductClassificationValue
            classifi={classifi}
            classificationSelected={classificationSelected}
            onchangeClassification={onchangeClassification}
          />
        </div>
      ))}
    </div>
  );
}
