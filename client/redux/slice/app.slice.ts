import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAppInitalState, ModalActionPayload } from "../state/app.state";
import { Theme } from "@/interfaces/app.interface";

const appInitialState: IAppInitalState = {
  modalState: null,
  appLoading: false,
  theme: "light",
};

const appSlice = createSlice({
  name: "app",
  initialState: appInitialState,
  reducers: {
    openModal: (
      state,
      action: { payload: ModalActionPayload; type: string }
    ) => {
      state.modalState = action.payload;
    },
    closeModal: (state) => {
      state.modalState = null;
    },
    startLoadingAnimation: (state) => {
      state.appLoading = state.appLoading ? false : true;
    },
    changeWebMode: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
    setWebMode: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
  },
});

export const appReducer = appSlice.reducer;
export const {
  closeModal,
  setWebMode,
  openModal,
  startLoadingAnimation,
  changeWebMode,
} = appSlice.actions;
