import { faDeleteLeft, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CartActionSection({
  productId,
  onUpdate,
  onDelete,
}: {
  id: string;
  productId: string;
  onUpdate: (productId: string) => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onUpdate(productId)}
        title="cập nhật giỏ hàng"
        className="px-4 py-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 text-green-700 dark:text-green-400 text-sm rounded-md hover:bg-green-100 dark:hover:bg-green-900/40 transition-all duration-200 font-medium whitespace-nowrap"
      >
        <FontAwesomeIcon icon={faUpload} />
      </button>
      <button
        onClick={() => onDelete()}
        title="xóa giỏ hàng"
        className="px-4 py-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-400 text-sm rounded-md hover:bg-red-100 dark:hover:bg-red-900/40 transition-all duration-200 font-medium whitespace-nowrap"
      >
        <FontAwesomeIcon icon={faDeleteLeft} />
      </button>
    </div>
  );
}
