import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "@/features/auth/redux/auth.slice";
import { commonReducer } from "@/features/common/redux/common.slice";
import { authApi } from "@/features/auth/redux/auth.api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    common: commonReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
