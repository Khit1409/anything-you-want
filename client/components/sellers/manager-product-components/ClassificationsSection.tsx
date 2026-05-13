import React from "react";

interface CountValue {
  parentIndex: number;
  size: number;
}

interface Props {
  countClassification: number;
  countClassificationValue: CountValue[];
  blockInputClassificationValue: (parentIndex: number) => boolean;
  onchangeClassification: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addNewClassificationInput: () => void;
  addNewClassificationValueInput: (parentIndex: number) => void;
  removeClassification: (parentIndex: number) => void;
  removeClassificationValue: (parentIndex: number, valueIndex: number) => void;
}

export default function ClassificationsSection({
  countClassification,
  countClassificationValue,
  blockInputClassificationValue,
  onchangeClassification,
  addNewClassificationInput,
  addNewClassificationValueInput,
  removeClassification,
  removeClassificationValue,
}: Props) {
  return (
    <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 hover:shadow-sm transition-all">
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-800 text-white font-bold text-sm">
          3
        </div>
        <h2 className="text-lg font-semibold text-gray-900">
          Phân loại sản phẩm
        </h2>
      </div>

      {Array.from({ length: countClassification }).map((_, index) => (
        <div className="space-y-5" key={index}>
          <div>
            <label
              htmlFor="classification-name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Tên phân loại
            </label>
            <input
              type="text"
              id="classification-name"
              onChange={(e) => onchangeClassification(e)}
              data-parent-index={index}
              name="name"
              placeholder="Nhập tên phân loại (ví dụ: Màu sắc, Kích cỡ)"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 transition-all"
            />
          </div>

          {Array.from({
            length:
              countClassificationValue.find((f) => f.parentIndex === index)
                ?.size ?? 1,
          }).map((_, indexValue) => (
            <div
              className="pl-4 border-l-2 border-gray-200 space-y-4"
              key={indexValue}
            >
              {blockInputClassificationValue(index) && (
                <p className="italic text-xs text-red-500">
                  *Vui lòng nhập tên phân loại trước.
                </p>
              )}
              <h4 className="text-sm font-medium text-gray-700">
                Giá trị phân loại
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="value-name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Tên giá trị
                  </label>
                  <input
                    type="text"
                    onChange={(e) => onchangeClassification(e)}
                    id="value-name"
                    disabled={blockInputClassificationValue(index)}
                    name="name"
                    data-parent-index={index}
                    data-value-index={indexValue}
                    placeholder="Ví dụ: Đỏ, M, Nhôm"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="value-price"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Giá thêm
                  </label>
                  <input
                    type="number"
                    data-parent-index={index}
                    disabled={blockInputClassificationValue(index)}
                    data-value-index={indexValue}
                    id="value-price"
                    onChange={(e) => onchangeClassification(e)}
                    placeholder="0"
                    name="extraPrice"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 transition-all"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="value-quantity"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Số lượng
                  </label>
                  <input
                    type="number"
                    disabled={blockInputClassificationValue(index)}
                    id="value-quantity"
                    placeholder="0"
                    data-parent-index={index}
                    onChange={(e) => onchangeClassification(e)}
                    data-value-index={indexValue}
                    name="stock"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="value-image"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Ảnh minh hoạ
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="value-image"
                      name="img"
                      disabled={blockInputClassificationValue(index)}
                      data-parent-index={index}
                      data-value-index={indexValue}
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-500 flex items-center gap-2 cursor-pointer hover:bg-gray-50 transition-all">
                      <i className="fas fa-cloud-arrow-up text-sm"></i>
                      <span className="text-sm">Chọn ảnh</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="">
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => removeClassificationValue(index, indexValue)}
                >
                  Xóa
                </button>
              </div>
              <div className="">
                <button
                  className="text-green-500 hover:underline"
                  onClick={() => addNewClassificationValueInput(index)}
                >
                  Thêm giá trị khác
                </button>
              </div>
            </div>
          ))}

          <div className="pl-4 space-y-4">
            <button
              className="text-red-500 hover:underline"
              onClick={() => removeClassification(index)}
            >
              Xóa phân loại này
            </button>
          </div>
        </div>
      ))}
      <div className="my-3 p-3">
        <button
          className="rounded p-2"
          onClick={() => addNewClassificationInput()}
        >
          Thêm phân loại
        </button>
      </div>
    </div>
  );
}
