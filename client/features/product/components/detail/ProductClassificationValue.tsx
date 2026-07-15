import { ProductClassificationValue as ValueType } from "@/productInterfaces/read.interface";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useProductDetailContext } from "../../contexts/ProductDetailContext";

interface Props {
  clsName: string;
  value: ValueType;
}

export default function ProductClassificationValue(props: Props) {
  const { value, clsName } = props;
  const { onChangeOptionIds, optionIds } = useProductDetailContext();

  const isChecked = () => {
    return optionIds.find((f) => f.name === clsName && f.id === value.id);
  };

  const checked = isChecked();

  return (
    <button
      onClick={() => onChangeOptionIds(value.id, clsName)}
      className={`relative cursor-pointer transition-all duration-150 focus:outline-none ${
        value.img ? "flex flex-col items-center gap-2" : "px-3 py-2"
      }`}
    >
      {value.img ? (
        <>
          <div
            className={`w-16 h-16 rounded-md overflow-hidden relative flex items-center justify-center ${
              checked
                ? "ring-2 ring-green-500"
                : "ring-1 ring-(--border) hover:ring-green-300"
            }`}
          >
            <Image
              src={value.img}
              alt={value.name}
              fill
              className="object-cover"
            />

            {checked && (
              <span className="absolute top-1 right-1 text-green-600 bg-white rounded-full p-0.5">
                <FontAwesomeIcon icon={faCheck} className="text-[10px]" />
              </span>
            )}
          </div>

          <div
            className={`text-xs ${checked ? "text-green-700 font-semibold" : "text-(--text)"}`}
          >
            {value.name}
          </div>
        </>
      ) : (
        <div
          className={`flex items-center gap-2 ${checked ? "text-green-700 font-semibold" : "text-(--text)"}`}
        >
          <span className="text-sm">{value.name}</span>
        </div>
      )}

      {checked && (
        <span
          className="absolute right-0 top-1/2 -translate-y-1/2 h-6 w-2 bg-green-500 rounded-l-md"
          aria-hidden
        />
      )}
    </button>
  );
}
