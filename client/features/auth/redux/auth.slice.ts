import { createSlice } from "@reduxjs/toolkit";
import { AuthInitialState } from "./auth.state";
import { authApi } from "./auth.api";

const initialState: AuthInitialState = {
  error: undefined,
  isLoggedIn: false,
  initialized: false,
  authData: undefined,
  isLoading: false,
};

export const auhtInitialState = initialState;

//me proccess status
export const mePending = authApi.endpoints.me.matchPending;
export const meSuccess = authApi.endpoints.me.matchFulfilled;
export const meError = authApi.endpoints.me.matchRejected;
//login process status
export const loginPending = authApi.endpoints.login.matchPending;
export const loginSuccess = authApi.endpoints.login.matchFulfilled;
export const loginError = authApi.endpoints.login.matchRejected;
//logout process status
export const logoutSuccess = authApi.endpoints.logout.matchFulfilled;
export const logoutError = authApi.endpoints.logout.matchRejected;
export const logoutPending = authApi.endpoints.logout.matchPending;

export const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(mePending, (state) => {
      state.isLoading = true;
      state.initialized = true;
    });
    builder.addMatcher(meSuccess, (state, action) => {
      state.initialized = true;
      state.authData = action.payload.data;
      state.isLoggedIn = true;
      state.isLoading = false;
    });
    builder.addMatcher(meError, (state, action) => {
      state.initialized = true;
      state.authData = undefined;
      state.error = action.error.message;
      state.isLoading = false;
    });
    //login
    builder.addMatcher(loginPending, (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(loginSuccess, (state) => {
      state.isLoggedIn = true;
      state.isLoading = false;
    });
    //logout
    builder.addMatcher(logoutPending, (state) => {
      state.isLoading = true;
    });

    builder.addMatcher(logoutSuccess, (state) => {
      state.authData = undefined;
      state.initialized = false;
      state.isLoggedIn = false;
      state.isLoading = false;
    });
    builder.addMatcher(logoutError, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
  },
});

export const authReducer = authSlice.reducer;
