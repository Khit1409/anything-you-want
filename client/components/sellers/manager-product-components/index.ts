// Export all components from this index file (grouped folders)
export { default as ProductListPreview } from "./list/ProductListPreview";
export { default as ProductListRow } from "./list/ProductListRow";
export { default as ProductCard } from "./list/ProductCard";
export { default as ProductImage } from "./list/ProductImage";
export { default as ProductInfo } from "./list/ProductInfo";
export { default as ProductPrice } from "./list/ProductPrice";
export { default as ProductRating } from "./list/ProductRating";
export { default as ProductStatus } from "./list/ProductStatus";
export { default as ProductActions } from "./list/ProductActions";

// Form related
export { default as CreateProductForm } from "./form/CreateProductForm";
export { default as EditProductDetail } from "./form/EditProductDetail";
export { default as ProductInfoSection } from "./form/ProductInfoSection";
export { default as CategorySection } from "./form/CategorySection";
export { default as ClassificationsSection } from "./form/ClassificationsSection";
export { default as ImageSection } from "./form/ImageSection";
export { default as ShippingSection } from "./form/ShippingSection";
export { default as ActionButtons } from "./form/ActionButtons";

// Modals / misc
export { default as WarningRemoveProductModal } from "./modals/WarningRemoveProductModal";

// Container
export { default as ManagerProductContent } from "./ManagerProductContent";

/**
 * USAGE EXAMPLE:
 *
 * import { ProductListPreview } from "@/components/sellers/manager-product-components";
 *
 * // Use with hook
 * <ProductListPreview />
 *
 * INDIVIDUAL COMPONENT USAGE:
 *
 * import {
 *   ProductListRow,
 *   ProductPrice,
 *   ProductRating,
 *   ProductStatus
 * } from "@/components/sellers/manager-product-components";
 */
