import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NotFoundCart() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="p-2 flex gap-1 items-center">
        <FontAwesomeIcon icon={faCartShopping} className="text-3xl" />
        <p>
          Ôi không hình như giỏ hàng của bạn không còn sản phẩm nào. Hoặc có lỗi
          gì đó truy cập sau nhé!
        </p>
      </div>
    </div>
  );
}
