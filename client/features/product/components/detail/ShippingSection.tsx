import { generagetShipping } from "@/features/common/helpers/enum-type.helper";
import { ProductShipping } from "../../interfaces/read.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShippingFast } from "@fortawesome/free-solid-svg-icons";

export default function ShippingSection({
  shipping,
}: {
  shipping: ProductShipping;
}) {
  const { methods } = shipping;
  return (
    <div className="text-sm text-(--muted) max-w-125 p-2">
      <div className={`gap-3 flex`}>
        {methods.map(
          (method) =>
            method.enabled && (
              <div key={method.type} className="flex gap-2 items-center">
                <FontAwesomeIcon icon={faShippingFast} />
                <span>{generagetShipping(method.type)}</span>
              </div>
            ),
        )}
      </div>
    </div>
  );
}
