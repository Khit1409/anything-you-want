import useCartList from "@/hooks/carts/useCartList";
import SectionShowDataLoading from "../common/SectionShowDataLoading";
import NotFoundCart from "./NotFoundCart";
import Image from "next/image";
import CartAction from "./CartAction";
import CartInfo from "./CartInfo";
import CartVariantOption from "./CartVariantOption";

export default function CartList() {
  const {
    carts,
    isLoading,
    onchangeQuantity,
    onchangeVariantOptionChosen,
    submitUpdate,
    updateData,
    submitDelete,
  } = useCartList();

  return (
    <div id="cart-list" className="min-h-screen bg-gray-50 px-4 py-6">
      {isLoading ? (
        <SectionShowDataLoading />
      ) : carts.length == 0 ? (
        <NotFoundCart />
      ) : (
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-4">
            {carts.map((cart) => (
              <div
                key={cart.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
              >
                {(() => {
                  const items = cart.items;
                  const variantChosen = cart.variantChosen;
                  const options = cart.options;

                  return (
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Image and Update Button */}
                      <div className="shrink-0">
                        <div className="w-40 h-40 bg-gray-100 rounded-lg overflow-hidden mb-3">
                          <Image
                            src={items.thumbnail}
                            alt="cart image"
                            title="cart image"
                            width={160}
                            height={160}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CartAction
                          submitUpdate={submitUpdate}
                          updateData={updateData}
                          cartId={cart.id}
                          submitDelete={submitDelete}
                        />
                      </div>

                      {/* Info */}
                      <CartInfo
                        onchangeQuantity={onchangeQuantity}
                        items={items}
                        cartId={cart.id}
                      />

                      {/* Variant Options */}
                      <CartVariantOption
                        onchangeVariantOptionChosen={
                          onchangeVariantOptionChosen
                        }
                        options={options}
                        cartId={cart.id}
                        variantChosen={variantChosen}
                      />
                    </div>
                  );
                })()}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
