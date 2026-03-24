"use client";

import NotFoundProduct from "@/components/products/NotFoundProduct";
import SectionShowDataLoading from "@/components/common/SectionShowDataLoading";
import ProductImage from "@/components/products/ProductImage";
import ProductInformation from "@/components/products/ProductInformation";
import ProductRelated from "@/components/products/ProductRelated";
import useProductDetail from "@/hooks/products/useProductDetail";
import ProductClassification from "@/components/products/ProductClassificationPreview";
import ProductAction from "@/components/products/ProductAction";

export default function ProductDetailPage() {
  const {
    product,
    isLoading,
    error,
    related,
    finalPrice,
    minusSale,
    quantity,
    setQuantity,
  } = useProductDetail();

  if (isLoading) return <SectionShowDataLoading />;
  if (!isLoading && !product) return <NotFoundProduct />;
  if (error) return <p>{error.message}</p>;

  return product ? (
    <div className="w-full p-4 bg-gray-50 mt-3">
      <div className="uppercase py-2 border-b border-gray-300">
        <h3>Thông tin sản phẩm</h3>
      </div>
      <div className="flex gap-4 bg-white">
        <div className="flex-1">
          <ProductImage images={product.images} />
          <ProductClassification classification={product.classification} />
        </div>
        <div className="flex-1">
          <ProductInformation
            product={product}
            finalPrice={finalPrice}
            minusSale={minusSale}
          />
          <ProductAction
            quantity={quantity}
            maxQuantity={100}
            setQuantity={setQuantity}
          />
        </div>
      </div>
      {related.length > 0 && <ProductRelated products={related} />}
    </div>
  ) : (
    <NotFoundProduct />
  );
}
