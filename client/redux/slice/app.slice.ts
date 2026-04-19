import { createSlice } from "@reduxjs/toolkit";
import { IAppInitalState, ModalActionPayload } from "../state/app.state";

const appInitialState: IAppInitalState = {
  modalState: null,
  appLoading: false,
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
  },
});

export const appReducer = appSlice.reducer;
export const { closeModal, openModal, startLoadingAnimation } =
  appSlice.actions;
