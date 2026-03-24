import type { Metadata } from "next";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Nunito } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/redux/ReduxProvider";
import Provider from "./Provider";
import QueryProvider from "./query-provider";

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
          <Provider>
            <QueryProvider>{children}</QueryProvider>
          </Provider>
        </ReduxProvider>
      </body>
    </html>
  );
}
