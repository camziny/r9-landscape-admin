import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { TopNav } from "./_components/topnav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Route 9 Landscape Products Admin Dashboard",
  description:
    "Administrative dashboard for updating the user-facing application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`font-sans ${inter.className} dark`}>
          <div className="grid h-screen grid-rows-[auto,1fr]">
            <TopNav />
            <main className="overflow-y-scroll">{children}</main>
          </div>
          <div id="modal-root" />
        </body>
      </html>
    </ClerkProvider>
  );
}
