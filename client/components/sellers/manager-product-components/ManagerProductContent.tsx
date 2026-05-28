import WarningRemoveProductModal from "./modals/WarningRemoveProductModal";
import ProductListPreview from "./list/ProductListPreview";

export default function ManagerProductContent() {
  return (
    <div>
      <WarningRemoveProductModal />
      <ProductListPreview />
    </div>
  );
}
