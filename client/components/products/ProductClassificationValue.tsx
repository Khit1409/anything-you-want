import { CartClassificationRequest } from "@/interfaces/cart.interface";
import { ProductClassification } from "@/interfaces/product.interface";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

type OnchangeClassificationType = {
  name: string;
  value: string;
};

interface Props {
  classifi: ProductClassification;
  onchangeClassification: ({ name, value }: OnchangeClassificationType) => void;
  classificationSelected: Array<CartClassificationRequest>;
}

export default function ProductClassificationValue(props: Props) {
  const { classifi, onchangeClassification, classificationSelected } = props;

  const checkIsSelected = ({
    name,
    value,
  }: {
    name: string;
    value: string;
  }) => {
    return classificationSelected.find(
      (classifi) => classifi.name === name && classifi.values.name === value
    )
      ? true
      : false;
  };

  return (
    <div className={`flex flex-wrap gap-2`}>
      {classifi.values.map((value) => {
        const isSelected = checkIsSelected({
          name: classifi.name,
          value: value.name,
        });

        return value.img ? (
          /* Image variant */
          <button
            onClick={() => {
              onchangeClassification({
                name: classifi.name,
                value: value.name,
              });
            }}
            key={value.name}
            className="group flex flex-col items-center gap-1.5 cursor-pointer"
          >
            <div className="relative w-16 h-16 rounded-md overflow-hidden border transition-colors duration-200">
              <Image
                src={value.img}
                fill
                className="object-cover"
                alt={value.name}
                title={value.name}
              />

              <div className="absolute inset-0 bg-zinc-900/0 group-hover:bg-zinc-900/10 transition-all duration-200 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                />
              </div>
            </div>
            <span
              className={`text-[11px] tracking-wide transition-colors duration-200 ${
                isSelected
                  ? "text-green-700 font-semibold"
                  : "text-zinc-500 group-hover:text-zinc-900"
              }`}
            >
              {value.name}
              {isSelected && (
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-xs text-green-700 font-semibold"
                />
              )}
            </span>
          </button>
        ) : (
          /* Text variant */
          <button
            onClick={() => {
              onchangeClassification({
                name: classifi.name,
                value: value.name,
              });
            }}
            key={value.name}
            className={`flex items-center gap-2 px-4 py-2 rounded-md border transition-all duration-200 group cursor-pointer ${
              isSelected
                ? "border-green-500 bg-green-50"
                : "border-(--border) bg-(--surface) hover:border-zinc-800 hover:bg-zinc-900"
            }`}
          >
            <FontAwesomeIcon
              icon={faCheck}
              className={`text-[10px] ${
                isSelected
                  ? "text-green-600"
                  : "text-(--muted) group-hover:text-zinc-500 transition-colors duration-200"
              }`}
            />
            <span
              className={`text-[13px] font-medium tracking-wide transition-colors duration-200 whitespace-nowrap ${
                isSelected
                  ? "text-green-700"
                  : "text-(--text) group-hover:text-white"
              }`}
            >
              {value.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
