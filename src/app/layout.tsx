import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import NavBar from "@/component/NavBar";

const figtree = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BBR.gg | BattleBit Remastered Companion",
  description: "BattleBit Remastered Companion",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={figtree.className}>
        <NavBar />

        {children}
      </body>
      <Analytics />
    </html>
  );
};

export default RootLayout;
