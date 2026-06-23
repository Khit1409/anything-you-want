import Image from "next/image";
import Link from "next/link";

import { SectionShowDataLoading } from "@/features/common/components";
import CartNotFound from "./CartNotFound";
import CartInfoSection from "./CartInfoSection";
import CartActionSection from "./CartActionSection";

import useCartList from "../hooks/useCartList";

export default function CartList() {
  const { carts, isLoading, redirectToUpdate } = useCartList();

  return (
    <div
      id="cart-list"
      className={`bg-(--surface-muted) px-4 py-8 text-(--text)`}
    >
      {isLoading ? (
        <SectionShowDataLoading />
      ) : carts.length == 0 ? (
        <CartNotFound />
      ) : (
        <div className="max-w-6xl mx-auto">
          <div className="space-y-3">
            {carts.map((cart) => (
              <div
                className="bg-(--surface) rounded-lg shadow-sm hover:shadow-md transition-all duration-200 dark:shadow-lg dark:hover:shadow-xl dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden group"
                key={cart._id}
              >
                <div className="flex items-center gap-4 p-4">
                  {/* Product Image with Link */}
                  <Link href={`/products/${cart.product.productId}`}>
                    <div className="shrink-0 relative overflow-hidden rounded-md">
                      <Image
                        src={cart.product.thumbnail}
                        width={120}
                        height={120}
                        alt={cart.product.name}
                        className="w-30 h-30 group-hover:scale-105 transition-transform duration-200"
                        objectFit="cover"
                        loading="lazy"
                      />
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <CartInfoSection cart={cart} />
                  </div>

                  {/* Action Buttons */}
                  <div className="shrink-0 flex gap-2">
                    <CartActionSection
                      productId={cart.product.productId}
                      onDelete={() => {}}
                      id={cart._id}
                      onUpdate={redirectToUpdate}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
