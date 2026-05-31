import { faNoteSticky } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  description: string;
}

export default function ProductDescription({ description }: Props) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <FontAwesomeIcon icon={faNoteSticky} className="text-(--muted)" />
        <strong className="text-(--title) text-lg">Mô tả sản phẩm</strong>
      </div>
      <div className="text-(--text) leading-relaxed">
        <p>{description}</p>
      </div>
    </div>
  );
}
