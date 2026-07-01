import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "@/features/auth/redux/auth.slice";
import { commonReducer } from "@/features/common/redux/common.slice";
import { authApi } from "@/features/auth/redux/auth.api";
import { checkoutReducer } from "@/features/checkout/redux/checkout.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    common: commonReducer,
    [authApi.reducerPath]: authApi.reducer,
    checkout: checkoutReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
