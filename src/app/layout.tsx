import type { Metadata } from "next";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import Alert from "@/components/alert";

const ReduxProvider = dynamic(() => import("@/store/redux-provider"), {
  ssr: false
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Donasi Qoin App"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`overflow-auto no-scrollbar ${inter.className}`}>
        <ReduxProvider>
          <div className="select-none">{children}</div>
          <Alert />
        </ReduxProvider>
      </body>
    </html>
  );
}
