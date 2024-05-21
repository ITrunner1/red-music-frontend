import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import { cn } from "@/lib/utils";
import "../styles/globals.css";
import Sidebar from "@/components/sidebar/sidebar";
import Header from "@/components/header/header";
import QueryProvider from '@/providers/queryProvider';
import StoreProvider from '@/providers/storeProvider';
import PersistProvider from '@/providers/persistProvider';
import AuthProvider from '@/providers/authProvider';
import { AppProps } from 'next/app';

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
} : {
  children: React.ReactNode;
}) {
  return (
    <>
    <html lang="en">
      <body className={cn("dark", ubuntuFont.variable)}>        
        <QueryProvider>
          <StoreProvider>
            <PersistProvider> 
              <AuthProvider>             
                <main className="flex flex-wrap">                 
                    <Sidebar />
                    <section className="w-4/5">            
                      <Header />
                      <div className="pl-6 pr-6">
                        {children}
                      </div>
                    </section>                    
                </main> 
                </AuthProvider>              
            </PersistProvider>
          </StoreProvider>
        </QueryProvider>   
      </body>
    </html>
    </>
  );
}
