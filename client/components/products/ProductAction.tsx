import {
  faCartShopping,
  faMinus,
  faPlus,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  maxQuantity: number;
}

export default function ProductAction(props: Props) {
  const { quantity, setQuantity, maxQuantity } = props;
  const onchangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(e.target.value);
    setQuantity(inputValue);
  };

  const disableMinusButton = () => {
    if (quantity <= 1) return true;
    return false;
  };

  const disablePlusButton = () => {
    if (quantity === maxQuantity) return true;
    return false;
  };

  const disableAddToCartButton = () => {
    return false;
  };

  return (
    <div className="py-3">
      <div>
        {/* Quantity Selector */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-2">Số lượng:</label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuantity((prev) => prev - 1)}
              className={`w-10 h-10 border rounded flex items-center justify-center transition-colors ${
                disableMinusButton()
                  ? "border-gray-200 text-gray-300 cursor-not-allowed"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100 active:bg-gray-200"
              }`}
              disabled={disableMinusButton()}
            >
              <FontAwesomeIcon icon={faMinus} size="sm" />
            </button>
            <input
              type="number"
              name="quantity"
              onChange={(e) => onchangeQuantity(e)}
              id="quantity"
              value={quantity}
              className="w-20 h-10 border border-gray-300 rounded text-center outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              min="1"
            />
            <button
              className={`w-10 h-10 border rounded flex items-center justify-center transition-colors ${
                disablePlusButton()
                  ? "border-gray-200 text-gray-300 cursor-not-allowed"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100 active:bg-gray-200"
              }`}
              onClick={() => setQuantity((prev) => prev + 1)}
              disabled={disablePlusButton()}
            >
              <FontAwesomeIcon icon={faPlus} size="sm" />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => {}}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded transition-colors ${
              disableAddToCartButton()
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600 active:bg-green-700"
            }`}
            disabled={disableAddToCartButton()}
          >
            <FontAwesomeIcon icon={faCartShopping} />
            <span className="font-medium">Thêm vào giỏ</span>
          </button>
          <button
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded transition-colors ${
              disableAddToCartButton()
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700"
            }`}
            disabled={disableAddToCartButton()}
          >
            <FontAwesomeIcon icon={faShoppingBag} />
            <span className="font-medium">Mua ngay</span>
          </button>
        </div>
      </div>
    </div>
  );
}
