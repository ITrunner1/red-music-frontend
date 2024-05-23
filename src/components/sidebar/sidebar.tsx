import Link from "next/link";
import { FC } from "react";
import Menu from "./components/menu/menu";
import { menu } from "./components/menu/menuItem";

const Sidebar: FC = () => {
   return (
      <aside className='py-5 px-7'>
         <Link className='text-2xl font-semibold' href='/'>            
            Red Music           
         </Link>

         <Menu title='Меню' items={menu} />
         <div className='text-gray-400 text-opacity-60 text-xs'>
            ©️ 2024 RED-MUSIC By ITrunner 
         </div>
      </aside>
   )
}

export default Sidebar;