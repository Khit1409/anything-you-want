import BackToTopButton from "@/components/common/BackToTopButton";
import Footer from "@/components/users/Footer";
import Navbar from "@/components/users/Navbar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div id="top-page"></div>
      <Navbar />
      {children}
      <BackToTopButton />
      <Footer />
    </>
  );
}
