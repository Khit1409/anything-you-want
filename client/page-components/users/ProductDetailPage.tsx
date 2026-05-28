"use client";

import NotFoundProduct from "@/components/products/NotFoundProduct";
import SectionShowDataLoading from "@/components/common/SectionShowDataLoading";
import ProductImage from "@/components/products/ProductImage";
import ProductInformation from "@/components/products/ProductInformation";
import ProductRelated from "@/components/products/ProductRelated";
import ProductClassification from "@/components/products/ProductClassificationPreview";
import ProductAction from "@/components/products/ProductAction";
import useProductDetailActions from "@/hooks/products/actions/useProductDetailActions";

import {
  useProductDetailHelpers,
  useProductDetailQueries,
} from "@/hooks/products";

export default function ProductDetailPage() {
  const queries = useProductDetailQueries();
  const { error, isLoading, product, relateds } = queries;
  const helpes = useProductDetailHelpers(product);
  const {
    classificationSelected,
    finalPrice,
    getMaxQuantity,
    minusSale,
    onchangeClassification,
    quantity,
    setQuantity,
    getVariantId,
  } = helpes;

  const variantId = getVariantId();

  const actions = useProductDetailActions({
    variantId,
    product,
    quantity,
  });

  const { addToCartHandle } = actions;

  if (isLoading) return <SectionShowDataLoading />;
  if (!isLoading && !product) return <NotFoundProduct />;
  if (error) return <p>{error.message}</p>;

  return product ? (
    <div className="w-full bg-(--surface-muted) mt-3 dark:bg-(--background)">
      <div className="uppercase py-2 px-4 border-b border-(--border)">
        <h3 className="product-title-heading-section">Thông tin sản phẩm</h3>
      </div>
      <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 p-3 lg:p-4 bg-(--surface)">
        <div className="flex-1 min-h-0">
          <div className="h-full flex flex-col gap-3">
            <div className="h-96 lg:h-auto lg:flex-1 overflow-hidden rounded">
              <ProductImage images={product.images} />
            </div>
            <div className="lg:hidden">
              <ProductClassification
                classificationSelected={classificationSelected}
                classifications={product.classifications}
                onchangeClassification={onchangeClassification}
              />
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-2 lg:gap-3">
          <ProductInformation
            product={product}
            finalPrice={finalPrice}
            minusSale={minusSale}
          />
          <div className="hidden lg:block">
            <ProductClassification
              classificationSelected={classificationSelected}
              classifications={product.classifications}
              onchangeClassification={onchangeClassification}
            />
          </div>
          <ProductAction
            addToCart={addToCartHandle}
            quantity={quantity}
            maxQuantity={getMaxQuantity()}
            setQuantity={setQuantity}
          />
        </div>
      </div>
      {relateds.length > 0 && <ProductRelated products={relateds} />}
    </div>
  ) : (
    <NotFoundProduct />
  );
}
