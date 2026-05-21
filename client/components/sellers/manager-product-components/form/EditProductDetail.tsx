import ProductInfo from "./ProductInfo";
import ProductCategories from "./ProductCategories";
import ProductStatus from "./ProductStatus";
import ProductImage from "./ProductImage";
import ProductClassification from "./ProductClassification";
import useEditProduct from "@/hooks/sellers/products/actions/useEditProduct";

export default function EditProductDetail() {
  const { product, categories, isSelectedCategory } = useEditProduct();

  if (!product)
    return (
      <div className="p-4 text-sm text-gray-500 dark:text-gray-400">
        Loading product...
      </div>
    );

  return (
    <div className="space-y-6 p-4 bg-white dark:bg-gray-800 rounded-md shadow-sm">
      <div>
        <h2 className="text-lg font-semibold mb-2">1. Thông tin </h2>
        <ProductInfo info={product.info} />
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">2. Danh mục</h2>
        <ProductCategories
          categories={categories}
          isSelectedCategory={isSelectedCategory}
        />
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">3. Hình ảnh</h2>
        <ProductImage images={product.images} />
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">4. Phân loại</h2>
        <ProductClassification classification={product.classification} />
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">5. Timestamps & Status</h2>
        <ProductStatus product={product} />
      </div>
    </div>
  );
}
