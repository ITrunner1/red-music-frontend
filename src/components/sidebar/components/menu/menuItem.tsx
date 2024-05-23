'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { FC, useMemo } from "react"
import { IconType } from "react-icons"
import { HiChartBar, HiCollection, HiHome, HiStar } from "react-icons/hi"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/UseAuth"
import { BsMusicNote } from "react-icons/bs"
import { MdLibraryMusic } from "react-icons/md"
import { motion } from 'framer-motion';

export interface IMenuItemProps{ 
    link: string
    title: string
    icon?: IconType
    image?: string
    active: boolean
}

export const menu:IMenuItemProps[] = [
    {
        icon: BsMusicNote,
        title: 'Музыка',
        active: true,     
        link: '/',            
    },
    {
        icon: MdLibraryMusic,
        title: 'Моя музыка', 
        active: false,        
        link: '/my-music',
    }, 
    {
        icon: HiCollection,
        title: 'Мои подписки',
        active: false,         
        link: '/search',
    },    
    {
        icon: HiChartBar,
        title: 'Тренды',  
        active: false,     
        link: '/liked',
    },
]

const MenuItem: FC<{item: IMenuItemProps}> = ({item}) => {   
    const router = useRouter()
    const { user } = useAuth()  

    if(item.link === '/my-music')
        if(!user) return null
        else item.link = `/c/${user?.id}`

    return (
        <motion.li whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}  className='block mb-10 last:mb-0'>
            <Link href={item.link}
                className={cn(`flex items-center text-gray-500 font-medium relative`,
                            item.active && "text-primary-foreground bg-primary rounded-md"
                            )}>
                <span className={cn(item.image ? '' : 'mr-2 p-2 rounded-xl')}>
                    {item.icon && <item.icon className="h-[25px] w-[25px]" />}                        
                </span>
                <b className="font-normal">{item.title}</b>            
            </Link>            
        </motion.li>
    )
}

export default MenuItem

