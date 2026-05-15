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
    <div className="mb-6 bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-700">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
        Phân loại sản phẩm
      </h3>

      {Array.from({ length: countClassification }).map((_, index) => (
        <div
          className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700 last:border-0"
          key={index}
        >
          <div className="mb-3">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tên phân loại
            </label>
            <input
              type="text"
              onChange={(e) => onchangeClassification(e)}
              data-parent-index={index}
              name="name"
              placeholder="Ví dụ: Màu, Size"
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-600"
            />
          </div>

          {Array.from({
            length:
              countClassificationValue.find((f) => f.parentIndex === index)
                ?.size ?? 1,
          }).map((_, indexValue) => (
            <div
              className="mb-3 p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              key={indexValue}
            >
              {blockInputClassificationValue(index) && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  *Nhập tên phân loại trước
                </p>
              )}
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tên giá trị
                  </label>
                  <input
                    type="text"
                    onChange={(e) => onchangeClassification(e)}
                    disabled={blockInputClassificationValue(index)}
                    name="name"
                    data-parent-index={index}
                    data-value-index={indexValue}
                    placeholder="Đỏ, M..."
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-600 disabled:bg-gray-100 dark:disabled:bg-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Giá thêm
                  </label>
                  <input
                    type="number"
                    data-parent-index={index}
                    disabled={blockInputClassificationValue(index)}
                    data-value-index={indexValue}
                    onChange={(e) => onchangeClassification(e)}
                    placeholder="0"
                    name="extraPrice"
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-600 disabled:bg-gray-100 dark:disabled:bg-gray-600"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Số lượng
                  </label>
                  <input
                    type="number"
                    disabled={blockInputClassificationValue(index)}
                    placeholder="0"
                    data-parent-index={index}
                    onChange={(e) => onchangeClassification(e)}
                    data-value-index={indexValue}
                    name="stock"
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-600 disabled:bg-gray-100 dark:disabled:bg-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Ảnh minh hoạ
                  </label>
                  <input
                    type="file"
                    name="img"
                    disabled={blockInputClassificationValue(index)}
                    data-parent-index={index}
                    data-value-index={indexValue}
                    accept="image/*"
                    className="block w-full text-xs file:mr-1 file:py-1 file:px-2 file:border file:border-gray-300 dark:file:border-gray-600 file:rounded file:text-xs file:bg-white dark:file:bg-gray-700 dark:file:text-gray-100"
                  />
                </div>
              </div>
              <div className="flex gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => removeClassificationValue(index, indexValue)}
                  className="flex-1 py-1 px-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Xóa
                </button>
                <button
                  type="button"
                  onClick={() => addNewClassificationValueInput(index)}
                  className="flex-1 py-1 px-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  + Giá trị
                </button>
              </div>
            </div>
          ))}

          <div className="mt-2">
            <button
              type="button"
              onClick={() => removeClassification(index)}
              className="text-xs py-1 px-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Xóa phân loại
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => addNewClassificationInput()}
        className="w-full py-2 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        + Thêm phân loại
      </button>
    </div>
  );
}
