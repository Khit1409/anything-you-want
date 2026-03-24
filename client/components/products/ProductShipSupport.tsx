import { ProductShipping } from "@/interfaces/response/product.response";
import { faTruck, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  shipSupport: ProductShipping;
}
export default function ProductShipSupport({ shipSupport }: Props) {
  return (
    <div className="space-y-2 py-3 bg-gray-50 px-4">
      <div className="flex gap-3">
        {shipSupport.normal && (
          <div className="flex gap-1">
            <FontAwesomeIcon icon={faTruck} className="text-teal-600" />{" "}
            <small>Giao hàng truyền thống</small>
          </div>
        )}
        {shipSupport.flash && (
          <div className="flex gap-1">
            <FontAwesomeIcon icon={faTruckFast} className="text-teal-600" />{" "}
            <small>Giao hỏa tốc</small>
          </div>
        )}
      </div>
    </div>
  );
}
