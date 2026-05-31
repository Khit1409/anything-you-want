import { ProductRating } from "@/interfaces";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface Props {
  ratingSumary: ProductRating;
}

export default function Rating({ ratingSumary }: Props) {
  const { avg, total } = ratingSumary;

  return (
    <div className="flex items-center gap-1 mb-2">
      <div className="flex items-center">
        {Array.from({ length: avg }).map((_, index) => (
          <FontAwesomeIcon
            key={index}
            icon={faStar}
            className={`text-xs ${
              index < avg
                ? "text-orange-400 dark:text-orange-300"
                : "text-(--muted) dark:text-zinc-600"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-(--muted) dark:text-zinc-400 ml-1">
        ({total})
      </span>
    </div>
  );
}
