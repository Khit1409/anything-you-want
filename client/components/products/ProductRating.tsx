import { ProductRating } from "@/interfaces/response/product.response";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  rating: ProductRating;
}

export default function ProductRatingSection({ rating }: Props) {
  return (
    <div className="flex items-center gap-2 py-3 bg-(--surface-muted) px-4">
      {/* <span className="text-2xl font-bold text-gray-900">{rating.avg}</span> */}
      <FontAwesomeIcon icon={faStar} className="text-yellow-500 text-xl" />
      <span className="text-sm text-(--muted)">
        Đánh giá từ {rating.total} khách hàng
      </span>
    </div>
  );
}
