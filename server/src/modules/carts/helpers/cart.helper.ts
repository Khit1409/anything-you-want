interface CalculateCartTotalPriceParams {
  originPrice: number;
  sale: number;
  quantity: number;
  variantPrice: number;
}

export const calculateCartTotalPrice = ({
  originPrice,
  quantity,
  sale,
  variantPrice,
}: CalculateCartTotalPriceParams) => {
  const finalPrice = originPrice - originPrice * (sale / 100);
  return finalPrice * quantity + variantPrice;
};
