'use client'

import { api } from "@/store/api/api";
import { FC, useEffect } from "react";
import { Button} from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import Link from "next/link";
import { useAuth } from "@/hooks/UseAuth";
import { useActions } from "@/hooks/useActions";
import { useRouter } from "next/navigation";

const profileModal: FC = () => {   
   const router = useRouter();

   useEffect(() => {
      if (user) {
         router.refresh
      }
   }, [router])

     const { user } = useAuth()

   const { data, isLoading } = api.useGetProfileQuery(null, {
      skip: !user
   })

   const { logout } = useActions()
   
   if (isLoading) return null

   return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <Button variant='link' className="opacity-75 hover:opacity-100">          
            <Avatar>
               <AvatarImage src={data?.avatarPath || ''} />
               <AvatarFallback>{data?.name}</AvatarFallback>
            </Avatar> 
            {data?.name}
         </Button>         
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
         <DropdownMenuLabel>Профиль</DropdownMenuLabel>  
         <DropdownMenuSeparator />   
         <DropdownMenuGroup>
            <DropdownMenuItem>
               <Link href={`/c/${user?.id}`}>Моя музыка</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
               <Link href={`/studio`}>В студию</Link>
            </DropdownMenuItem>
         </DropdownMenuGroup>  
         <DropdownMenuSeparator />
         <DropdownMenuItem>
            <Button 
               type="button"
               variant="ghost"
               onClick={logout}    
               >
                  Выйти    
            </Button>
         </DropdownMenuItem>                                                   
        </DropdownMenuContent>
      </DropdownMenu>
   )
}

export default profileModal;