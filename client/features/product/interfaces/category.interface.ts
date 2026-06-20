/**
 * Kiểu dữ liệu của danh mục sản phẩm được trả về khi gọi request lấy danh mục sản phẩm
 */
export interface Category {
  id: string;
  name: string;
  slug: string;
}

export type Categories = Array<Category>;
