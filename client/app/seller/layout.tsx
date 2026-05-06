import React from "react";
import { axiosServer } from "@/lib/configs/axios-server.config";
import { IAuthenticationResponse } from "@/interfaces/common/auth.interface";
import { redirect } from "next/navigation";
import Navbar from "@/components/sellers/Navbar";
import Header from "@/components/sellers/Header";

async function getMe() {
  try {
    console.log("getMe in seller layout is fetching data...");
    const axios = await axiosServer();
    const res = await axios.get("/auth/me");
    const api = res.data as IAuthenticationResponse;
    return api.data;
  } catch (error) {
    console.log("checking authentication seller is error:", error);
    return null;
  }
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getMe();
  if (!data) redirect("/login");
  const { role } = data;
  if (role !== "seller") redirect("/");
  return (
    <main className="flex gap-2 p-2">
      <Navbar />
      <div className="flex-1">
        <Header />
        <div className="overflow-x-hidden overflow-y-auto seller-content-container">
          {children}
        </div>
      </div>
    </main>
  );
}
