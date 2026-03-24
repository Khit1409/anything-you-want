import React from "react";
import SellerAuthWrapper from "./SellerAuthWrapper";
import Loading from "@/components/common/Loading";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SellerAuthWrapper>
      <Loading />
      {children}
    </SellerAuthWrapper>
  );
}
