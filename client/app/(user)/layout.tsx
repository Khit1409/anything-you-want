import React from "react";
import "@/style/product.css";
import "@/style/login.css";

import { BackToTopButton } from "@/features/common/components";
import { Footer, Navbar } from "@/features/user/components/layouts";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <div id="top-page"></div>
      <Navbar />
      {children}
      <BackToTopButton />
      <Footer />
    </main>
  );
}
