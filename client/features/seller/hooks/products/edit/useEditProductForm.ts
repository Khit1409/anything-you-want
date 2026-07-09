import { EditProductRequest } from "@/features/product/interfaces/update.interface";
import { useForm } from "react-hook-form";

export default function useEditProductForm() {
  const editUseForm = useForm<{
    data: EditProductRequest;
  }>();

  return { ...editUseForm };
}
