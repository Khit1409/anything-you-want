import React from "react";
import { axiosServer } from "@/lib/configs/axios-server.config";
import { AuthenticationResponse } from "@/interfaces/auth.interface";
import { redirect } from "next/navigation";
import Navbar from "@/components/sellers/layouts/Navbar";
import Header from "@/components/sellers/layouts/Header";
import "@/styles/seller.css";
import { isAxiosError } from "axios";

async function getMe() {
  try {
    console.log("getMe in seller layout is fetching data...");
    const axios = await axiosServer();
    const res = await axios.get("/auth/me");
    const api = res.data as AuthenticationResponse;
    if (!api.data) {
      console.log(
        "checking is success but user is not logged in, data fetching is null..."
      );
      return null;
    }
    const { role } = api.data;

    console.log(
      "checking role is successfully! role is",
      role,
      role === "seller" ? "- correct role!" : "- incorrect role!"
    );

    return api.data;
  } catch (error) {
    if (isAxiosError(error) && (error as Error).cause === "ECONNRESET") {
      console.log(
        "checking authentication seller is success, but token notfound!, user is not loggin!"
      );
      return null;
    }
    console.log("checking authentication seller is error:", error);
    return null;
  }
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const checkedAuthentication = await getMe();
  if (!checkedAuthentication) redirect("/login");
  const { role } = checkedAuthentication;
  if (role !== "seller") redirect("/");
  return (
    <div className="layout-container">
      <Header />
      <main className="flex gap-2 border-t border-(--border)">
        <Navbar />
        <div className="flex-1 h-(--h-seller) overflow-y-auto">
          <div className="p-2 w-full">{children}</div>
        </div>
      </main>
    </div>
  );
}
