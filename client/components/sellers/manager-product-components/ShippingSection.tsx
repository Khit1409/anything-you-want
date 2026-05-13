import React from "react";

interface Shipping {
  normal?: boolean;
  flash?: boolean;
}

interface Props {
  shipping: Shipping;
  onchangeShipping: (e: React.ChangeEvent<any>) => void;
}

export default function ShippingSection({ shipping, onchangeShipping }: Props) {
  return (
    <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 hover:shadow-sm transition-all">
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-800 text-white font-bold text-sm">
          4
        </div>
        <h2 className="text-lg font-semibold text-gray-900">
          Hình thức vận chuyển
        </h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center h-6">
            <input
              type="checkbox"
              id="shipping-normal"
              name="normal"
              checked
              readOnly
              className="w-4 h-4 rounded bg-white cursor-pointer"
            />
          </div>
          <label
            htmlFor="shipping-normal"
            className="flex flex-col gap-1 cursor-pointer"
          >
            <span className="text-sm font-medium text-gray-900">
              Vận chuyển truyền thống
            </span>
            <small className="text-xs text-red-500 italic">
              <i className="fas fa-info-circle me-1"></i>
              *Hình thức vận chuyển cơ bản bất buộc
            </small>
          </label>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex items-center h-6">
            <input
              type="checkbox"
              id="shipping-flash"
              name="flash"
              checked={shipping.flash}
              onChange={(e) => onchangeShipping(e)}
              className="w-4 h-4 rounded bg-white cursor-pointer"
            />
          </div>
          <label
            htmlFor="shipping-flash"
            className="flex flex-col gap-1 cursor-pointer"
          >
            <span className="text-sm font-medium text-gray-900">
              Extra Express (Vận chuyển nhanh)
            </span>
            <small className="text-xs text-gray-500">
              Kích hoạt tùy chọn giao hàng nhanh
            </small>
          </label>
        </div>
      </div>
    </div>
  );
}
