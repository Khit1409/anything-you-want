import {
  authService,
  LoginData,
  LoginResponse,
  loginService,
} from "@/api/auth.api";
import { IAuthenticationResponse } from "@/interfaces/common/auth.interface";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginThunk = createAsyncThunk<
  LoginResponse,
  LoginData,
  { rejectValue: string }
>("login", async ({ currentPassword, emailAddress, loginRole }, thunkAPI) => {
  try {
    const result = await loginService({
      currentPassword,
      emailAddress,
      loginRole,
    });

    if (!result.success) {
      return thunkAPI.rejectWithValue(result.message);
    }

    return result;
  } catch (error) {
    return thunkAPI.rejectWithValue(("Unkwon this error!" + error) as string);
  }
});

export const authThunk = createAsyncThunk<
  IAuthenticationResponse,
  void,
  { rejectValue: string }
>("auth", async (_, thunkAPI) => {
  try {
    const result = await authService();
    return result;
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string);
  }
});
