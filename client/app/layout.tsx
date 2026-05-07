import type { Metadata } from "next";
import "./globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Nunito } from "next/font/google";
import ReduxProvider from "@/redux/ReduxProvider";

import QueryProvider from "./query-provider";
import AppModal from "@/components/common/AppModal";
import Loading from "@/components/common/Loading";
import AppWrapper from "./AppWrapper";
import "./globals.css";
import "@/style/hero.css";
import "@/style/register.css";

config.autoAddCss = true;

const nunito = Nunito({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anything You Want - Ecommerce",
  description: "Website ecommerce is the best in the word",
  icons: {
    icon: "/assets/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={nunito.className}>
        <ReduxProvider>
          <AppWrapper>
            <QueryProvider>
              <AppModal />
              <Loading />
              {children}
            </QueryProvider>
          </AppWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
