import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slice/auth.slice";
import { appReducer } from "./slice/app.slice";
import { productReducer } from "./slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
