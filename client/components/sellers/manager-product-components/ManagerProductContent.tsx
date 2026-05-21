import WarningRemoveProductModal from "./modals/WarningRemoveProductModal";
import ProductListPreview from "./list/ProductListPreview";
import useMangerProduct from "@/context/sellers/ManagerProductContext";

export default function ManagerProductContent() {
  const { handles } = useMangerProduct();
  const { handleDelete, onCloseWarningModal, openWarningModal } = handles;

  return (
    <div>
      <WarningRemoveProductModal
        deleteHandle={handleDelete}
        onClose={onCloseWarningModal}
        open={openWarningModal}
      />
      <ProductListPreview />
    </div>
  );
}
