'use client'
import EditUserModal from "@/components/header/profile/editUserModal";
import Link from "next/link";
import { api } from "@/store/api/api";
import { FC } from "react";
import { Button } from "../../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useActions } from "@/hooks/useActions";
import { Avatar } from "@nextui-org/react";

const ProfileModal: FC = () => {
   const { user } = useAuth()

   const { data, isLoading } = api.useGetProfileQuery(null, {
      skip: !user
   })

   const { logout } = useActions()

   if (isLoading) return null

   return (     
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button size='sm' variant="link" className="flex gap-2 cursor-pointer hover:no-underline text-foreground">
                  <Avatar
                     src={data?.avatarPath || ''}
                     alt={data?.avatarPath || ''}>
                  </Avatar>
                  {data?.name}
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
               <DropdownMenuLabel>Профиль</DropdownMenuLabel>
               <DropdownMenuSeparator />
               <DropdownMenuGroup>
                  <DropdownMenuItem>
                     <Link href={`/user/${user?.id}`}>Моя музыка</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                     <Link href={`/studio`}>В студию</Link>
                  </DropdownMenuItem>
               </DropdownMenuGroup>
               <DropdownMenuSeparator />
               <EditUserModal />
               <DropdownMenuSeparator />
               <DropdownMenuItem>
                  <div
                     className="cursor-pointer"
                     onClick={logout}
                  >
                     Выйти
                  </div>
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
   )
}

export default ProfileModal;