import { ProductListPreview } from "../list";
import { WarningRemoveProductModal } from "../modals";

export default function ManagerProductContent() {
  return (
    <>
      <WarningRemoveProductModal />
      <ProductListPreview />
    </>
  );
}
