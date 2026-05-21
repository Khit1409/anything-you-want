"use client";

import LoginForm from "@/components/common/LoginForm";
import LoginText from "@/components/common/LoginText";

import useLogin from "@/hooks/users/useLogin";

export default function LoginPage() {
  const { setLoginData, submitForm, error } = useLogin();

  return (
    <div className="login-bg-img min-h-screen w-screen overflow-x-hidden bg-linear-to-br from-gray-50 to-gray-100">
      <div className="backdrop-blur-sm w-full min-h-screen flex items-center justify-center p-4">
        <div className="flex flex-col lg:flex-row w-full max-w-5xl max-h-[600px] rounded-2xl shadow-2xl overflow-hidden">
          <LoginText />
          <LoginForm
            setState={setLoginData}
            submit={submitForm}
            errorMess={error}
          />
        </div>
      </div>
    </div>
  );
}
