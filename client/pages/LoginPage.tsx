"use client";

import { FormEvent, useState } from "react";
import LoginForm from "@/components/common/LoginForm";
import LoginText from "@/components/common/LoginText";
import { LoginData } from "@/api/auth.api";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { authThunk, loginThunk } from "@/redux/thunk/auth.thunk";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const loginError = useSelector((state: RootState) => state.auth.error);
  const route = useRouter();

  const [loginData, setLoginData] = useState<LoginData>({
    currentPassword: "",
    emailAddress: "",
    loginRole: "user",
  });

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    const result = await dispatch(loginThunk(loginData));
    if (loginThunk.fulfilled.match(result) && result.payload.data) {
      dispatch(authThunk());
      return route.replace("/");
    }
  };

  return (
    <div className="login-bg-img min-h-screen w-screen overflow-x-hidden bg-linear-to-br from-gray-50 to-gray-100">
      <div className="backdrop-blur-sm w-full min-h-screen flex items-center justify-center p-4">
        <div className="flex flex-col lg:flex-row w-full max-w-5xl max-h-[600px] rounded-2xl shadow-2xl overflow-hidden">
          <LoginText />
          <LoginForm
            setState={setLoginData}
            submit={submitForm}
            errorMess={loginError}
          />
        </div>
      </div>
    </div>
  );
}
