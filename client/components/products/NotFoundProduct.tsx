import { faGift } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NotFoundProduct() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="p-2 flex gap-1 items-center">
        <FontAwesomeIcon icon={faGift} className="text-3xl" />
        <p className="text-(--text)">
          Ôi không hình như chúng tôi không còn sản phẩm nào. Hoặc có lỗi gì đó
          truy cập sau nhé!
        </p>
      </div>
    </div>
  );
}
