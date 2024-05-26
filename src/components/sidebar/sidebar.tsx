'use client'

import Link from "next/link";
import { FC } from "react";
import Menu from "./components/menu/menu";

const Sidebar: FC = () => {
   // const { user } = useAuth()

   // const { data } = api.useGetProfileQuery(null, {
   //    skip: !user
   // })

   return (
      <aside className='px-7'>
         <Link className='text-2xl font-semibold' href='/'>            
            Red Music           
         </Link>    

         <Menu title='Меню'/>

         {/* { user && <Menu title='Мои подписки' items={
            data?.subscriptions.map(({toArtist}) => ({
               image: toArtist.avatarPath,
               title: toArtist.name,
               link: '/c/' + toArtist.id
            })) || []
            }
            />
         } */}

         <div className='text-gray-400 text-opacity-60 text-xs'>
            ©️ 2024 RED-MUSIC By ITrunner 
         </div>
      </aside>
   )
}

export default Sidebar;