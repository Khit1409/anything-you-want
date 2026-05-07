import React from "react";
import { axiosServer } from "@/lib/configs/axios-server.config";
import { IAuthenticationResponse } from "@/interfaces/common/auth.interface";
import { redirect } from "next/navigation";
import Navbar from "@/components/sellers/Navbar";
import Header from "@/components/sellers/Header";
import "@/styles/seller.css";
import { isAxiosError } from "axios";

async function getMe() {
  try {
    console.log("getMe in seller layout is fetching data...");
    const axios = await axiosServer();
    const res = await axios.get("/auth/me");
    const api = res.data as IAuthenticationResponse;
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
    <>
      <Header />
      <main className="flex gap-2 border-t border-(--border)">
        <Navbar />
        <div className="flex-1">
          <div className="overflow-x-hidden overflow-y-auto seller-content-container p-2">
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
