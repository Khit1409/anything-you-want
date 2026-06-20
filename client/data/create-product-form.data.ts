import { CreateProductInfo } from "@/features/product/interfaces/product.interface";
import { countries } from "./country-list.data";

interface CreateProductInfoForm {
  id: string;
  name: keyof CreateProductInfo;
  title: string;
  required: boolean;
  message: string;
  type: string;
  datalist?: any[];
}

type CreateProductInfoForms = Array<CreateProductInfoForm>;

export const createProductInfoFormData: CreateProductInfoForms = [
  {
    id: "name",
    name: "name",
    title: "Tên sản phẩm",
    required: true,
    message: "Tên sản phẩm",
    type: "text",
  },
  {
    id: "price",
    name: "price",
    title: "Giá",
    required: true,
    message: "Giá sản phẩm",
    type: "number",
  },
  {
    id: "sale",
    title: "Khuyến mãi",
    name: "sale",
    required: true,
    message: "Khuyến mãi",
    type: "text",
  },
  {
    id: "description",
    name: "description",
    title: "Mô tả",
    type: "text",
    message: "Mô tả sản phẩm của bạn",
    required: true,
  },
  {
    id: "brand",
    name: "brand",
    title: "Thương hiệu",
    type: "text",
    message: "Thương hiệu của sản phẩm nếu có",
    required: false,
  },
  {
    id: "origin",
    name: "origin",
    title: "Xuất xứ",
    type: "text",
    message: "Xuất xứ của sản phẩm",
    required: false,
    datalist: countries,
  },
];
