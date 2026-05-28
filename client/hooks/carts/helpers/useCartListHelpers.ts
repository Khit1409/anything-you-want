import { useState } from "react";

export default function useCartListHelpers() {
  const [idToUpdate, setIdToUpdate] = useState<string>();
  const [newQuantity, setNewQuantity] = useState<number | undefined>();
  const [newVariantChosen, setNewVariantChosen] = useState<string>();

  const onchangeVariantChosen = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    setNewVariantChosen(value);
  };

  return {
    idToUpdate,
    setIdToUpdate,
    newQuantity,
    setNewQuantity,
    onchangeVariantChosen,
    newVariantChosen,
  };
}
