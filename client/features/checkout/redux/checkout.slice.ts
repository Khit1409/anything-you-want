import { createSlice } from "@reduxjs/toolkit";
import { checkoutInitalState } from "./checkout.state";

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState: checkoutInitalState,
  reducers: {
    setPaymetState: (state, action) => {
      state.paymentValue = action.payload;
    },
    resetPaymetValue: (state) => {
      state.paymentValue = undefined;
    },
    setError: (state, action) => {
      state.errorMess = action.payload;
    },
  },
});

export const { resetPaymetValue, setError, setPaymetState } =
  checkoutSlice.actions;
export const checkoutReducer = checkoutSlice.reducer;
