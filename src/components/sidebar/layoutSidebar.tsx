"use client";

import { cn } from "@/lib/utils";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { usePlayerToggle } from "@/hooks/usePlayer";
import { Sidebar } from "./sidebar";
import useStore  from "../../hooks/use-store";
import Header from "../header/header";
import MusicPlayer from "../musicPlayer/musicPlayerContent";

export default function LayoutSidebar({
  children
}: {
  children: React.ReactNode;
}) {
  const sidebar = useStore(useSidebarToggle, (state) => state);
  const player = useStore(usePlayerToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <>
      <Sidebar />  
      <div className={cn(
          "transition-[margin-left] ease-in-out duration-300",
          sidebar?.isOpen === false ? " lg:ml-[90px]" : "max-sm:ml- lg:ml-72"
        )}>  
          <Header />        
      </div>               
      <main
        className={cn(
          "transition-[margin-left] mt-12 px-16 max-sm:px-4 ease-in-out duration-300",
          sidebar?.isOpen === false ? "lg:ml-[90px] " : "lg:ml-72",
          player?.isOpen === false ? "lg:mb-[90px]" : "lg:mb-12"
        )}
      >
        {children}
      </main>   
      <div className={cn(
          "transition-[margin-left] z-1 ease-in-out duration-300",
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
        )}>        
      </div> 
      <MusicPlayer />  
    </>
  );
}
