import { FC } from "react";
import Search from "./search";
import IconsRight from "./icons-right";

const Header: FC = () => {
   return (
      <header className="w-[1680px] relative pt-6 pl-6 border-b-stone-500 flex flex-wrap justify-between items-center">
         <Search />
         <IconsRight />
      </header>
   )
}

export default Header;