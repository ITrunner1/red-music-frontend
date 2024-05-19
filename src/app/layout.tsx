import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "../styles/globals.css";
import { cn } from "@/lib/utils";
import Sidebar from "@/components/sidebar/sidebar";
import Header from "@/components/header";


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
        <main className="flex flex-wrap">
          <Sidebar />
          <section className="w-4/5">
            <Header />
            <div className="pl-6 pr-6">
              {children}
            </div>
          </section>
        </main>        
      </body>
    </html>
  );
}
