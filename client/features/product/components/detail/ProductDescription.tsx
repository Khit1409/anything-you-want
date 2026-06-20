import { faNoteSticky } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  description: string;
}

export default function ProductDescription({ description }: Props) {
  return (
    <section className="mt-4">
      <div className="flex items-center gap-3 mb-3">
        <FontAwesomeIcon icon={faNoteSticky} className="text-(--muted)" />
        <h3 className="text-(--title) font-semibold">Mô tả sản phẩm</h3>
      </div>

      <div className="text-(--text) leading-relaxed prose prose-sm max-w-none">
        <p>{description}</p>
      </div>
    </section>
  );
}
