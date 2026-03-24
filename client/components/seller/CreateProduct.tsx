"use client";
import { fakeCategory, fakeOptions, fakeOptionValues } from "@/data/fakeData";
import useCreateProduct from "@/hooks/seller/useCreateProduct";
import CreateProductVariant from "./CreateProductVariant";

export default function CreateProduct() {
  const { setCategory, category, productOptions, setProductOption } =
    useCreateProduct();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <div className="bg-white border-b border-gray-200 rounded-lg">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <h1 className="text-2xl font-semibold text-gray-900">
              Tạo sản phẩm mới
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Thêm sản phẩm vào cửa hàng của bạn
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          {/* Product Information Section */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Thông tin cơ bản
            </h2>

            {/* Category Selection */}
            <div className="mb-6">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Danh mục sản phẩm <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                id="category"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                onChange={(e) => setCategory(e.target.value)}
              >
                {fakeCategory.map((category, index) => (
                  <option value={category.slug} key={index}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Product Name */}
            <div className="mb-6">
              <label
                htmlFor="product_name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Tên sản phẩm <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                id="product_name"
                placeholder="Nhập tên sản phẩm"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Price and Sale Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price */}
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Giá sản phẩm (VNĐ) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  min={0}
                  id="price"
                  required
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Sale */}
              <div>
                <label
                  htmlFor="sale"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Giảm giá (%) <span className="text-red-500">*</span>
                </label>
                <input
                  id="sale"
                  type="number"
                  name="sale"
                  min={0}
                  max={100}
                  required
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Product Variants Section */}
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Phân loại sản phẩm
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Chọn các tùy chọn và giá trị cho sản phẩm
            </p>
            <CreateProductVariant
              categorySlug={category}
              optionSelected={productOptions}
              optionValues={fakeOptionValues}
              options={fakeOptions}
              setProductOption={setProductOption}
            />
          </div>

          {/* Action Buttons */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg flex justify-end gap-3">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Lưu sản phẩm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
