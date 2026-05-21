import CategorySection from "./CategorySection";
import ProductInfoSection from "./ProductInfoSection";
import ClassificationsSection from "./ClassificationsSection";
import ShippingSection from "./ShippingSection";
import ActionButtons from "./ActionButtons";
import ImageSection from "./ImageSection";
import { useCreateProduct } from "@/hooks/sellers";

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
    onchangeImages,
    removeImageDetailInput,
    addNewImageDetailInput,
    uploadImageFile,
    imageFile,
    countImageDetailInput,
  } = useCreateProduct();

  return (
    <div className="mx-auto px-4 h-(--h-seller)">
      <CategorySection
        categories={categories}
        onchangeProductInfo={onchangeProductInfo}
      />

      <ProductInfoSection onchangeProductInfo={onchangeProductInfo} />
      <ImageSection
        onchange={onchangeImages}
        imagesSelected={imageFile}
        countImgDetailInput={countImageDetailInput}
        uploadImage={uploadImageFile}
        removeImageDetailInput={removeImageDetailInput}
        addNewImageDetailInput={addNewImageDetailInput}
      />
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
