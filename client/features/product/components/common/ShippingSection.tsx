import {
  ProductShipping,
  ShippingMethod,
} from "../../interfaces/read.interface";
import {
  faBolt,
  faCalendarCheck,
  faClockRotateLeft,
  faGlobe,
  faMoon,
  faStore,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const shippingConfig = {
  [ShippingMethod.STANDARD]: {
    icon: faTruck,
    label: "Giao hàng tiêu chuẩn",
    description: "Nhận hàng trong 3–5 ngày",
    badgeClass: "bg-stone-100 text-stone-600",
    iconClass: "text-stone-400",
  },
  [ShippingMethod.EXPRESS]: {
    icon: faBolt,
    label: "Giao hàng nhanh",
    description: "Nhận hàng trong 1–2 ngày",
    badgeClass: "bg-amber-50 text-amber-600",
    iconClass: "text-amber-400",
  },
  [ShippingMethod.SAMEDAY]: {
    icon: faClockRotateLeft,
    label: "Giao trong ngày",
    description: "Đặt trước 12h, nhận ngay hôm nay",
    badgeClass: "bg-rose-50 text-rose-500",
    iconClass: "text-rose-400",
  },
  [ShippingMethod.NEXTDAY]: {
    icon: faMoon,
    label: "Giao hôm sau",
    description: "Đặt hôm nay, nhận ngày mai",
    badgeClass: "bg-purple-50 text-purple-500",
    iconClass: "text-purple-400",
  },
  [ShippingMethod.INTERNATIONAL]: {
    icon: faGlobe,
    label: "Giao quốc tế",
    description: "Nhận hàng trong 7–14 ngày",
    badgeClass: "bg-teal-50 text-teal-600",
    iconClass: "text-teal-400",
  },
  [ShippingMethod.PICKUP]: {
    icon: faStore,
    label: "Nhận tại cửa hàng",
    description: "Sẵn sàng để lấy ngay hôm nay",
    badgeClass: "bg-orange-50 text-orange-500",
    iconClass: "text-orange-400",
  },
  [ShippingMethod.SCHEDULED]: {
    icon: faCalendarCheck,
    label: "Giao theo lịch hẹn",
    description: "Chọn ngày & giờ giao phù hợp",
    badgeClass: "bg-lime-50 text-lime-600",
    iconClass: "text-lime-500",
  },
};

export default function ShippingSection({
  shipping,
  forElement,
}: {
  shipping: ProductShipping;
  forElement?: "detail" | "list";
}) {
  const { methods } = shipping;
  return (
    <div className="text-sm text-(--text) max-w-125">
      <div
        className={`gap-3 ${forElement === "detail" ? "grid grid-cols-4" : "flex"}`}
      >
        {methods.map((method) => (
          <Item key={method.type} type={method.type} forElement={forElement} />
        ))}
      </div>
    </div>
  );
}

function Item({
  type,
  forElement,
}: {
  type: ShippingMethod;
  forElement?: "detail" | "list";
}) {
  return (
    <div className="w-max flex gap-1">
      <FontAwesomeIcon icon={shippingConfig[type].icon} />
      {forElement !== "list" && <small>{shippingConfig[type].label}</small>}
    </div>
  );
}
