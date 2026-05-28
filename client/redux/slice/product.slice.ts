import { createSlice } from "@reduxjs/toolkit";
import { ProductInitialState } from "../state";
import { ProductVariants } from "@/interfaces";

interface SaveVariantAction {
  payload: ProductVariants;
  type: string;
}

const productInitialState: ProductInitialState = {
  error: null,
  loading: false,
  updateVariantData: [],
};

const productSlice = createSlice({
  name: "products",
  initialState: productInitialState,
  reducers: {
    saveVariantData: (state, action: SaveVariantAction) => {
      state.updateVariantData = action.payload;
    },
  },
});

export const { saveVariantData } = productSlice.actions;
export const productReducer = productSlice.reducer;
