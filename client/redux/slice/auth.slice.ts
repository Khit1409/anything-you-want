import { createSlice } from "@reduxjs/toolkit";
import { IAuthInitalState } from "../state/auth.state";
import { authThunk, loginThunk } from "../thunk/auth.thunk";

const authInitalState: IAuthInitalState = {
  isLoggedIn: false,
  error: null,
  loading: true,
  authData: null,
};
/**
 *
 */
const authSlice = createSlice({
  initialState: authInitalState,
  name: "auth_thunk",
  reducers: {},
  extraReducers(builder) {
    //login
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginThunk.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //auth
      .addCase(authThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(authThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data && action.payload.success) {
          state.isLoggedIn = true;
          state.authData = action.payload.data;
        } else {
          state.isLoggedIn = false;
        }
      })
      .addCase(authThunk.rejected, (state, action) => {
        state.error =
          (action.error.message as string) || (action.payload as string);
        state.isLoggedIn = false;
        state.loading = false;
      });
  },
});

export const authReducer = authSlice.reducer;
export const {} = authSlice.actions;
