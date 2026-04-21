import useCartList from "@/hooks/carts/useCartList";
import SectionShowDataLoading from "../common/SectionShowDataLoading";
import NotFoundCart from "./NotFoundCart";
import Image from "next/image";

export default function CartList() {
  const {
    carts,
    isLoading,
    updateCartHandle,
    setNewQuantity,
    onchangeClassificationSelected,
    setIdToUpdate,
    deleteCartHandle,
  } = useCartList();

  return (
    <div id="cart-list" className="min-h-screen bg-gray-50 px-4 py-8">
      {isLoading ? (
        <SectionShowDataLoading />
      ) : carts.length == 0 ? (
        <NotFoundCart />
      ) : (
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-6">
            {carts.map((cart) => (
              <div
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
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
                    <h3 className="text-lg font-bold uppercase text-gray-800 mb-3">
                      {cart.info.name}
                    </h3>

                    {/* Product Details */}
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                      <div>
                        <p className="text-gray-500 text-xs">Danh mục</p>
                        <p className="font-medium">{cart.info.category.name}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Thương hiệu</p>
                        <p className="font-medium">{cart.info.brand}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Xuất xứ</p>
                        <p className="font-medium">{cart.info.origin}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Ngày thêm</p>
                        <p className="font-medium">
                          {new Date(cart.createdAt).toLocaleDateString("vi-VN")}
                        </p>
                      </div>
                    </div>

                    {/* Quantity and Price */}
                    <div className="flex items-center gap-6 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Số lượng:</span>
                        <input
                          type="number"
                          onChange={(e) => {
                            setIdToUpdate(cart.id);
                            setNewQuantity(Number(e.target.value));
                          }}
                          defaultValue={Number(cart.info.quantity)}
                          min="1"
                          className="w-24 px-2 py-1 text-center border border-gray-300 rounded text-sm focus:outline-none focus:border-gray-400"
                        />
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Giá gốc: </span>
                        <span className="font-medium">
                          {Number(cart.info.originPrice).toLocaleString(
                            "vi-VN"
                          )}
                          đ
                        </span>
                      </div>
                    </div>

                    {/* Classification Options */}
                    {cart.classification.length > 0 && (
                      <div className="flex flex-wrap gap-4 mb-4">
                        {cart.classification.map((classifi) => (
                          <div key={classifi.name}>
                            <label className="text-sm text-gray-600 block mb-1">
                              {classifi.name}
                            </label>
                            <select
                              name={classifi.name}
                              data-id_update={cart.id}
                              onChange={(e) =>
                                onchangeClassificationSelected(e)
                              }
                              defaultValue={
                                classifi.values.find((f) => f.choosen)?.name
                              }
                              className="px-3 py-1 text-sm border border-gray-300 rounded bg-white focus:outline-none focus:border-gray-400"
                            >
                              <option value="">Chọn {classifi.name}</option>
                              {classifi.values.map((classifiValue) => (
                                <option
                                  value={classifiValue.name}
                                  key={classifiValue.name}
                                >
                                  {classifiValue.name}
                                  {classifiValue.choosen && " (đã chọn)"}
                                </option>
                              ))}
                            </select>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Total Price */}
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Tổng tiền:</span>
                      <span className="text-xl font-bold text-red-600">
                        {Number(cart.info.totalPrice).toLocaleString("vi-VN")}đ
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Section - Action Buttons */}
                <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setIdToUpdate(cart.id);
                      updateCartHandle();
                    }}
                    title="cập nhật giỏ hàng"
                    className="px-4 py-2 border border-gray-400 text-gray-700 text-sm rounded hover:bg-green-500 hover:text-white hover:border-0 transition-colors"
                  >
                    Cập nhật
                  </button>
                  <button
                    title="xóa giỏ hàng"
                    onClick={() => deleteCartHandle(cart.id)}
                    className="px-4 py-2 border border-gray-400 text-gray-700 text-sm rounded hover:bg-red-500 hover:text-white hover:border-0 transition-colors"
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
