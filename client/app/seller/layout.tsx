import React from "react";
import { axiosServer } from "@/lib/configs/axios-server.config";
import { AuthenticationResponse } from "@/features/auth/interfaces/auth.interface";
import { redirect } from "next/navigation";
import "@/styles/seller.css";
import { isAxiosError } from "axios";
import Header from "@/features/seller/components/layouts/Header";
import Navbar from "@/features/seller/components/layouts/Navbar";

async function getMe() {
  try {
    console.log("getMe in seller layout is fetching data...");
    const axios = await axiosServer();
    const res = await axios.get("/auth/me");
    const api = res.data as AuthenticationResponse;
    if (!api.data) {
      console.log(
        "checking is success but user is not logged in, data fetching is null...",
      );
      return null;
    }
    const { role } = api.data;

    console.log(
      "checking role is successfully! role is",
      role,
      role === "seller" ? "- correct role!" : "- incorrect role!",
    );

    return api.data;
  } catch (error) {
    if (isAxiosError(error)) {
      switch (error.code) {
        case "ECONNRESET":
        case "ECONNREFUSED":
          return null;

        case "ERR_BAD_REQUEST":
          return null;

        default:
          console.error(
            "checking authentication seller is error:",
            error.message,
          );
          return null;
      }
    }
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
