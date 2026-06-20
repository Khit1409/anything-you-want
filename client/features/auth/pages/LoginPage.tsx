"use client";

import LoginForm from "@/features/auth/forms/LoginForm";



export default function LoginPage() {
  return (
    <div className="login-bg-img min-h-screen w-screen overflow-x-hidden bg-linear-to-br from-gray-50 to-gray-100">
      <div className="backdrop-blur-sm w-full min-h-screen flex items-center justify-center p-4">
        <div className="flex flex-col lg:flex-row w-full max-w-5xl max-h-150 rounded-2xl shadow-2xl overflow-hidden">
          {/* <LoginText /> */}
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
