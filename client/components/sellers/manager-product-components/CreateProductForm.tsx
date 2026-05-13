import { createProductInfoFormData } from "@/data/create-product-form.data";
import useCreateProduct from "@/hooks/sellers/useCreateProduct";
import CategorySection from "./CategorySection";
import ProductInfoSection from "./ProductInfoSection";
import ClassificationsSection from "./ClassificationsSection";
import ShippingSection from "./ShippingSection";
import ActionButtons from "./ActionButtons";

export default function CreateProductForm() {
  const {
    categories,
    onchangeProductInfo,
    onchangeShipping,
    shipping,
    countClassification,
    addNewClassificationInput,
    removeClassification,
    countClassificationValue,
    removeClassificationValue,
    addNewClassificationValueInput,
    onchangeClassification,
    blockInputClassificationValue,
    createProduct,
  } = useCreateProduct();

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <CategorySection
        categories={categories}
        onchangeProductInfo={onchangeProductInfo}
      />

      <ProductInfoSection onchangeProductInfo={onchangeProductInfo} />

      <ClassificationsSection
        countClassification={countClassification}
        countClassificationValue={countClassificationValue}
        blockInputClassificationValue={blockInputClassificationValue}
        onchangeClassification={onchangeClassification}
        addNewClassificationInput={addNewClassificationInput}
        addNewClassificationValueInput={addNewClassificationValueInput}
        removeClassification={removeClassification}
        removeClassificationValue={removeClassificationValue}
      />

      <ShippingSection
        shipping={shipping}
        onchangeShipping={onchangeShipping}
      />

      <ActionButtons onCancel={() => {}} onSave={() => createProduct()} />
    </div>
  );
}
