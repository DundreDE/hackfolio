import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const mono = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://hackfolio-xi.vercel.app"),
  title: "Jakobonly",
  description: "My portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${mono.className} text-amber-600 bg-black`}>
        {children}
      </body>
    </html>
  );
}
