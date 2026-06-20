import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommonInitalState, ModalActionPayload } from "./common.state";
import { Theme } from "../interfaces/common.interface";

import {
  meError,
  mePending,
  meSuccess,
} from "@/features/auth/redux/auth.slice";

const appInitialState: CommonInitalState = {
  modalState: null,
  loading: false,
  theme: "light",
};

const commonSlice = createSlice({
  name: "app",
  initialState: appInitialState,
  reducers: {
    openModal: (
      state,
      action: { payload: ModalActionPayload; type: string },
    ) => {
      state.modalState = action.payload;
    },
    closeModal: (state) => {
      state.modalState = null;
    },
    startLoadingAnimation: (state) => {
      state.loading = true;
    },
    stopLoadingAnimation: (state) => {
      state.loading = false;
    },
    changeWebMode: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
    setWebMode: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(mePending, (state) => {
      state.loading = true;
    });
    builder.addMatcher(meSuccess, (state) => {
      state.loading = false;
    });
    builder.addMatcher(meError, (state) => {
      state.loading = false;
    });
  },
});

export const commonReducer = commonSlice.reducer;
export const {
  closeModal,
  setWebMode,
  openModal,
  startLoadingAnimation,
  changeWebMode,
  stopLoadingAnimation,
} = commonSlice.actions;
