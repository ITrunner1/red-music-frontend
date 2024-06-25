import '@vidstack/react/player/styles/base.css';
import "../styles/globals.css";
import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import { cn } from "@/lib/utils";
import QueryProvider from '@/providers/queryProvider';
import StoreProvider from '@/providers/storeProvider';
import PersistProvider from '@/providers/persistProvider';
import AuthProvider from '@/providers/authProvider';
import ReactQueryProvider from "@/providers/reactQueryProvider";
import LayoutSidebar from "@/components/sidebar/layoutSidebar";
import NextUiProvider from "@/providers/nextUIProvider";
import Script from 'next/script';


const ubuntuFont = Ubuntu({
  subsets: ["latin"],
  weight: "400",
  variable: "--ubuntu"
});

export const metadata: Metadata = {
  title: "Red Music",
  description: "Добро пожаловать в Red Music, платформу для потоковой передачи музыки. С Red Music просматривать, исследовать и управлять своей музыкой невероятно легко. Наш интуитивно понятный интерфейс обеспечивает беспрепятственное прослушивание и простоту навигации.",
  verification: { yandex: "6c86d3be8a510b12", google: "it_h5C0oCPsebsxRJtY4nHgSaVU6lV1_gqTg0rkfmFE" },
  keywords: "red music, red-music, red_music, Red Music, Red-Music, Red_Music, Ред Музыка, ред музыка, ред-музыка, музыка, Музыка, музыкальный стриминговый сервис",
  creator: "Matvey",
  publisher: "Matvey",
  robots: "index, follow"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn("dark", ubuntuFont.variable)}>
        <Script id="metrika-counter" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
 
    ym(97670884, "init", {
          defer: true,
          clickmap:true,
          trackLinks:true,
          accurateTrackBounce:true,
          webvisor:true
    });`
          }
        </Script>
        <NextUiProvider>
          <ReactQueryProvider>
            <QueryProvider>
              <StoreProvider>
                <PersistProvider>
                  <AuthProvider>
                    <LayoutSidebar>
                      {children}
                    </LayoutSidebar>
                  </AuthProvider>
                </PersistProvider>
              </StoreProvider>
            </QueryProvider>
          </ReactQueryProvider>
        </NextUiProvider>
      </body>
    </html>
  );
}
