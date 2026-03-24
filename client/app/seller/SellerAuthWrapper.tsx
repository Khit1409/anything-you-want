"use client";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

export default function SellerAuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authData } = useSelector((state: RootState) => state.auth);
  // const router = useRouter();

  if (!authData) {
    return <p>Loading....</p>;
  }

  // if (authData.role !== "seller") {
  //   router.replace("/login");
  // }

  return <>{children}</>;
}
