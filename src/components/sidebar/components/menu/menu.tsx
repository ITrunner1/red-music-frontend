'use client'

import { FC, useMemo } from "react";
import MenuItem, { IMenuItemProps } from "./menuItem";
import Line from "@/components/ui/line";
import { usePathname, useRouter } from "next/navigation";
import { BsMusicNote } from "react-icons/bs";
import { MdLibraryMusic } from "react-icons/md";
import { HiChartBar, HiCollection } from "react-icons/hi";

interface IMenu{
    title: string
    items: IMenuItemProps[]
}

const Menu: FC<IMenu> = ({items, title}) => {    
    const router = useRouter();            
    const pathname = usePathname();

    const routes = useMemo(() => [
        {
            icon: BsMusicNote,
            title: 'Музыка', 
            active: pathname === '/',      
            link: '/',            
        },
        {
            icon: MdLibraryMusic,
            title: 'Моя музыка',  
            active: pathname === '/my-music',      
            link: '/my-music',
        }, 
        {
            icon: HiCollection,
            title: 'Мои подписки',  
            active: pathname === '/subcriptions',       
            link: '/subcriptions',
        },    
        {
            icon: HiChartBar,
            title: 'Тренды',
            active: pathname === '/trands',         
            link: '/trands',
        },
    ], [pathname])
   
    return (
        <nav className = 'my-8'>
            <h3 className="text-gray-200 mb-7">
                {title}
            </h3>
            <ul className="list-none">
                {routes.map(menuItem => (
                    <MenuItem item={menuItem} key={menuItem.link} />
                ))}
            </ul>
            <Line />
        </nav>
    )
}

export default Menu