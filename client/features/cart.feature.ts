import { addToCartService } from "@/api/cart.api";
import { CartRequest } from "@/interfaces/request/cart.request";

interface CartValidateData {
  productId: string;
  quantity: number;
  classificationChoosenLenght: number;
  productClassificationLenght: number;
}
/**
 *
 * @param data
 * @returns
 */
export const handleValidateCartFormData = (
  data: CartValidateData
): { correct: boolean; mess?: string } => {
  const {
    classificationChoosenLenght,
    productClassificationLenght,
    productId,
    quantity,
  } = data;
  if (!productId) return { correct: false, mess: "Id sản phẩm không tồn tại!" };
  if (quantity < 1 || !quantity)
    return { correct: false, mess: "Số lượng không phù hợp!" };
  if (classificationChoosenLenght !== productClassificationLenght) {
    return { correct: false, mess: "Vui lòng chọn đủ số lượng phân loại!" };
  }
  return { correct: true, mess: "" };
};
/**
 *
 * @param data
 * @param classificationLenght
 * @returns
 */
export const submitAddToCart = async (
  data: CartRequest,
  classificationLenght: number
) => {
  const { classification, productId, quantity } = data;
  const validate = handleValidateCartFormData({
    classificationChoosenLenght: classification.length,
    productClassificationLenght: classificationLenght,
    productId,
    quantity,
  });
  if (!validate.correct) return validate;
  const result = await addToCartService(data);
  console.log(result);
};
