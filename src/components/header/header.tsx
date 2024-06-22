'use client'

import { FC } from "react";
import Search from "./search";
import IconsRight from "./iconsRight";
import useStore from "../../hooks/use-store";
import { useSidebarToggle } from "../../hooks/use-sidebar-toggle";
import { SheetMenu } from "./sheet-menu";

const Header: FC = () => {
   const sidebar = useStore(useSidebarToggle, (state) => state);

   if (!sidebar) return null;

   return (
      <header className="max-sm:px-2 w-full sticky top-0 px-8 border-b-stone-500 bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary z-10">
         <div className="flex h-14 justify-between">
            <div className="max-sm:mr-2">
               <SheetMenu />
            </div>
            <div>
               <Search />
            </div>
            <div className="max-sm:p-0">
               <IconsRight />
            </div>
         </div>
      </header>
   )
}

export default Header;