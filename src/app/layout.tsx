import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "../styles/globals.css";
import { cn } from "@/lib/utils";

const ubuntuFont = Ubuntu({ 
  subsets: ["latin"], 
  weight: "400",  
  variable: "--ubuntu"
});

export const metadata: Metadata = {
  title: "Red Music",
  description: "Red Music",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("dark", ubuntuFont.variable)}>
        {children}
      </body>
    </html>
  );
}
