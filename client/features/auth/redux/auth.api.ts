import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AuthenticationResponse,
  LoginRequest,
  LoginResponse,
} from "../interfaces/auth.interface";
import { LogoutResponse } from "../services/auth.service";

export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["Auth"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/auth",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    me: builder.query<AuthenticationResponse, void>({
      query: () => "/me",
      providesTags: ["Auth"],
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useMeQuery, useLoginMutation, useLogoutMutation } = authApi;
