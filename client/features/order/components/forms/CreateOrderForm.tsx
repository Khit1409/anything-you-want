"use client";

import NotFoundProduct from "@/features/product/components/common/NotFoundProduct";
import { useCreateOrderContext } from "../../contexts/CreateOrderContext";
import Image from "next/image";
import { useEffect } from "react";
import { SectionShowDataLoading } from "@/features/common/components";
import {
  ProductClassifications,
  ProductShippingMethods,
  ShippingMethod,
} from "@/features/product/interfaces/read.interface";
import { PaymentSupports } from "@/features/payments/interfaces/read.interface";

export default function CreateOrderForm() {
  const {
    product,
    register,
    provinces,
    onChangeProvinceCode,
    wardListByProvinceCode,
    onChangeSelectOptions,
    setValue,
    maxQuantity,
    optionIds,
    getVariant,
    sendOrder,
    handleSubmit,
    isLoading,
    watch,
  } = useCreateOrderContext();

  const wardList = wardListByProvinceCode();
  const variant = getVariant();

  const maxCanBuy = maxQuantity();
  const isChecked = (id: string) => {
    return optionIds.find((opt) => opt.id === id) ? true : false;
  };
  const isCheckedShipping = (type: ShippingMethod) => {
    const currentSelected = watch("data.shipMethod");
    return currentSelected === type;
  };
  const isCheckedPayment = (name: string) => {
    const current = watch("data.paymentType");
    return name === current;
  };

  useEffect(() => {
    if (variant) {
      setValue("data.variantId", variant._id);
    }
  }, [variant, setValue]);

  if (isLoading) return <SectionShowDataLoading />;
  if (!product && !isLoading) return <NotFoundProduct />;
  
  let shippingMethods: ProductShippingMethods = [];
  let classifications: ProductClassifications = [];
  let paymentSupports: PaymentSupports = [];
  if (product) {
    paymentSupports = product.paymentSupports;
    shippingMethods = product.shipping.methods;
    classifications = product.classifications;
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <form onSubmit={handleSubmit((formData) => sendOrder(formData.data))}>
        <div className="mb-8">
          <small className="text-yellow-500 italic">
            *Để đảm bảo không có sự nhầm lẫn khi đặt hàng, làm phiền khách hàng
            vui lòng chọn lại phân loại sản phẩm và điền các thông tin cần
            thiết!
          </small>
        </div>
        {/* Quantity Section */}
        <div className="mb-8">
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-slate-700 mb-3"
          >
            Số lượng sản phẩm
          </label>
          <input
            id="quantity"
            type="number"
            max={maxCanBuy}
            min={1}
            {...register("data.quantity")}
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent transition"
          />
        </div>

        {/* Product Options Section */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-5">
            Lựa chọn sản phẩm
          </h2>
          <div className="space-y-6">
            {classifications.map((classification) => (
              <div key={classification.id}>
                <p className="text-sm font-medium text-slate-600 mb-3">
                  {classification.name}
                </p>
                <div className="grid grid-cols-6 gap-3">
                  {classification.values.map((value) => (
                    <button
                      type="button"
                      onClick={() =>
                        onChangeSelectOptions({
                          clsName: classification.name,
                          valueId: value.id,
                        })
                      }
                      key={value.id}
                      className={`flex flex-col items-center gap-2 p-3 rounded-lg border ${isChecked(value.id) ? "border-green-500" : "border-slate-200"} bg-white hover:bg-slate-50 hover:border-slate-300 transition-all`}
                    >
                      {value.img && (
                        <Image
                          src={value.img}
                          width={50}
                          height={50}
                          alt={value.name}
                          className="rounded"
                        />
                      )}
                      <span className="text-xs font-medium text-slate-700 text-center">
                        {value.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Variant Info Section */}
        {variant && (
          <div className="mb-8 bg-slate-100 border border-slate-200 rounded-lg p-5">
            <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-4">
              Thông tin sản phẩm
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-500 font-medium mb-1">SKU</p>
                <p className="text-sm font-medium text-slate-900">
                  {variant.sku}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium mb-1">
                  Phiên bản
                </p>
                <p className="text-sm font-medium text-slate-900">
                  {variant.optionName}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium mb-1">
                  Giá thêm
                </p>
                <p className="text-sm font-medium text-slate-900">
                  {variant.extraPrice}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium mb-1">
                  Tồn kho
                </p>
                <p className="text-sm font-medium text-slate-900">
                  {variant.stock}
                </p>
              </div>
            </div>
          </div>
        )}
        {/* shipping */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-5">
            Phương thức vận chuyển
          </h2>
          <div className="flex flex-wrap gap-3">
            {shippingMethods.map((shipping) => (
              <div key={shipping.type}>
                <button
                  type="button"
                  onClick={() => {
                    setValue("data.shipMethod", shipping.type);
                  }}
                  className={`uppercase border-2 ${isCheckedShipping(shipping.type) ? "border-green-500" : "border-(--border)"} px-2 py-1`}
                >
                  {shipping.type}
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* payment type*/}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-5">
            Phương thức thanh toán
          </h2>
          <div className="flex flex-wrap gap-3">
            {paymentSupports.map((payment) => (
              <div key={payment.name}>
                <button
                  type="button"
                  onClick={() => {
                    setValue("data.paymentType", payment.name);
                  }}
                  className={`uppercase border-2 ${isCheckedPayment(payment.name) ? "border-green-500" : "border-(--border)"} px-2 py-1`}
                >
                  {payment.name}
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* Contact Section */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-5">
            Thông tin liên hệ
          </h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-slate-600 mb-2"
              >
                Số điện thoại nhận hàng
              </label>
              <input
                type="tel"
                id="phone"
                {...register("data.contact.phone")}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent transition"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-600 mb-2"
              >
                Email nhận thông báo
              </label>
              <input
                type="email"
                id="email"
                {...register("data.contact.email")}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent transition"
              />
            </div>
            <div>
              <label
                htmlFor="userName"
                className="block text-sm font-medium text-slate-600 mb-2"
              >
                Tên người nhận hàng
              </label>
              <input
                type="text"
                id="userName"
                {...register("data.contact.userName")}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent transition"
              />
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-5">
            Địa chỉ giao hàng
          </h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="province"
                className="block text-sm font-medium text-slate-600 mb-2"
              >
                Tỉnh / Thành phố
              </label>
              <select
                {...register("data.address.province")}
                id="province"
                onChange={(e) => onChangeProvinceCode(e)}
                className="w-full px-4 py-3 text-center bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent transition appearance-none cursor-pointer"
              >
                <option value="">---Tỉnh / Thành phố---</option>
                {provinces.map((pro) => (
                  <option value={pro.name} key={pro.code} data-code={pro.code}>
                    {pro.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="ward"
                className="block text-sm font-medium text-slate-600 mb-2"
              >
                Quận / Huyện
              </label>
              <select
                {...register("data.address.ward")}
                id="ward"
                className="w-full px-4 py-3 text-center bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent transition appearance-none cursor-pointer"
              >
                {wardList.length !== 0 ? (
                  wardList.map((ward) => (
                    <option value={ward.name} key={ward.code}>
                      {ward.name}
                    </option>
                  ))
                ) : (
                  <option value="">
                    ---Vui lòng chọn Tỉnh / Thành phố trước---
                  </option>
                )}
              </select>
            </div>

            <div>
              <label
                htmlFor="addressDetail"
                className="block text-sm font-medium text-slate-600 mb-2"
              >
                Địa chỉ cụ thể
              </label>
              <input
                type="text"
                id="addressDetail"
                {...register("data.address.detail")}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent transition"
              />
            </div>
          </div>
        </div>

        {/* Preview Button */}
        <button
          type="submit"
          className="w-full px-6 py-3 bg-slate-700 text-white font-medium rounded-lg hover:bg-slate-800 active:scale-95 transition-all shadow-sm"
        >
          Đặt hàng
        </button>
      </form>
    </div>
  );
}
