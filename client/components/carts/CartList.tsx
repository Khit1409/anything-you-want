import SectionShowDataLoading from "../common/SectionShowDataLoading";
import NotFoundCart from "./NotFoundCart";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux";

import {
  useCartListHelpers,
  useCartListQueries,
  useCartListActions,
} from "@/hooks/carts";

export default function CartList() {
  const dispatch = useDispatch<AppDispatch>();

  /**
   * Query hooks
   */
  const queries = useCartListQueries();
  const { carts, isLoading, refetch } = queries;
  /**
   * Helper hooks
   */
  const helpers = useCartListHelpers();
  const {
    idToUpdate,
    newQuantity,
    setIdToUpdate,
    setNewQuantity,
    onchangeVariantChosen,
    newVariantChosen,
  } = helpers;
  /**
   * Action hooks
   */
  const actions = useCartListActions({
    dispatch,
    idToUpdate,
    newQuantity,
    refetch,
    newVariant: newVariantChosen,
    setIdToUpdate,
    setNewQuantity,
  });
  const { deleteCartServiceHandle, updateCartServiceHandle } = actions;

  return (
    <div
      id="cart-list"
      className={`min-h-screen bg-(--surface-muted) px-4 py-8 text-(--text)`}
    >
      {isLoading ? (
        <SectionShowDataLoading />
      ) : carts.length == 0 ? (
        <NotFoundCart />
      ) : (
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-6">
            {carts.map((cart) => (
              <div
                className="bg-(--surface) rounded-lg shadow-md hover:shadow-lg transition-shadow dark:shadow-lg dark:hover:shadow-xl p-4"
                key={cart.id}
              >
                {/* Top Section - Image and Info */}
                <div className="flex gap-6 items-start mb-6">
                  {/* Product Image */}
                  <div className="shrink-0">
                    <Image
                      src={cart.images.thumbnail}
                      width={150}
                      height={150}
                      alt={cart.info.name}
                      className="rounded-md object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="grow">
                    {/* Product Name */}
                    <h3 className="text-lg font-bold uppercase text-(--title) dark:text-gray-100 mb-3">
                      {cart.info.name}
                    </h3>

                    {/* Product Details */}
                    <div className="grid grid-cols-2 gap-4 text-sm text-(--muted) dark:text-gray-400 mb-4">
                      <div>
                        <p className="text-(--muted) dark:text-gray-500 text-xs">
                          Danh mục
                        </p>
                        <p className="font-medium dark:text-gray-200">
                          {cart.info.category.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-(--muted) dark:text-gray-500 text-xs">
                          Thương hiệu
                        </p>
                        <p className="font-medium dark:text-gray-200">
                          {cart.info.brand}
                        </p>
                      </div>
                      <div>
                        <p className="text-(--muted) dark:text-gray-500 text-xs">
                          Xuất xứ
                        </p>
                        <p className="font-medium dark:text-gray-200">
                          {cart.info.origin}
                        </p>
                      </div>
                      <div>
                        <p className="text-(--muted) dark:text-gray-500 text-xs">
                          Ngày thêm
                        </p>
                        <p className="font-medium dark:text-gray-200">
                          {new Date(cart.createdAt).toLocaleDateString("vi-VN")}
                        </p>
                      </div>
                    </div>

                    {/* Quantity and Price */}
                    <div className="flex items-center gap-6 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-(--muted) dark:text-gray-400">
                          Số lượng:
                        </span>
                        <input
                          type="number"
                          onChange={(e) => {
                            setIdToUpdate(cart.id);
                            setNewQuantity(Number(e.target.value));
                          }}
                          defaultValue={Number(cart.info.quantity)}
                          min="1"
                          className="w-24 px-2 py-1 text-center border border-(--border) rounded text-sm focus:outline-none focus:border-(--border) dark:bg-(--surface) dark:text-gray-100 dark:border-gray-600"
                        />
                      </div>
                      <div className="text-sm">
                        <span className="text-(--muted) dark:text-gray-400">
                          Giá gốc:{" "}
                        </span>
                        <span className="font-medium dark:text-gray-200">
                          {Number(cart.info.originPrice).toLocaleString(
                            "vi-VN"
                          )}
                          đ
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 mb-4 text-sm">
                      <span className="text-(--muted) dark:text-gray-400">
                        Lựa chọn:{" "}
                      </span>
                      <div className="flex gap-2">
                        {Object.keys(cart.variant.options).map((key) => (
                          <span key={key} className="text-(--text)">
                            {cart.variant.options[key]}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-6 mb-4 text-sm">
                      <span className="text-(--muted) dark:text-gray-400">
                        Lựa chọn khác:{" "}
                      </span>
                      <div className="flex gap-2">
                        <select
                          name="variantUpdate"
                          id="variantUpdate"
                          className="border-0 outline-0 p-2 dark:bg-(--surface) text-(--text) dark:border-gray-600"
                          onChange={(e) => {
                            setIdToUpdate(cart.id);
                            onchangeVariantChosen(e);
                          }}
                          defaultValue={newVariantChosen}
                        >
                          <option value="">--Chọn các lựa chọn khác--</option>
                          {cart.otherVariants.map((otherVariant) => (
                            <option
                              className="text-(--text)"
                              value={otherVariant.id}
                              key={otherVariant.id}
                            >
                              {Object.keys(otherVariant.options).map(
                                (key) => otherVariant.options[key] + " "
                              )}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Total Price */}
                    <div className="flex items-center gap-2">
                      <span className="text-(--muted) dark:text-gray-400">
                        Tổng tiền:
                      </span>
                      <span className="text-xl font-bold text-red-600 dark:text-red-400">
                        {Number(cart.info.totalPrice).toLocaleString("vi-VN")}đ
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Section - Action Buttons */}
                <div className="flex gap-3 justify-end pt-4 border-t border-(--border) dark:border-gray-700">
                  <button
                    onClick={async () => {
                      setIdToUpdate(cart.id);
                      await updateCartServiceHandle();
                    }}
                    title="cập nhật giỏ hàng"
                    className="px-4 py-2 border border-(--border) text-(--muted) dark:text-gray-400 dark:border-gray-600 text-sm rounded hover:bg-green-500 hover:text-white hover:border-0 transition-colors dark:hover:bg-green-600"
                  >
                    Cập nhật
                  </button>
                  <button
                    title="xóa giỏ hàng"
                    onClick={async () => await deleteCartServiceHandle(cart.id)}
                    className="px-4 py-2 border border-(--border) text-(--muted) dark:text-gray-400 dark:border-gray-600 text-sm rounded hover:bg-red-500 hover:text-white hover:border-0 transition-colors dark:hover:bg-red-600"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
