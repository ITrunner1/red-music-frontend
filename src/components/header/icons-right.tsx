'use client'

import { useAuth } from "@/store/hooks/UseAuth";
import { FC } from "react";
import { Button } from "@/components/ui/button"
import ProfileMenu from "./profile-menu";
import UploadSong from "./upload-song";
import AuthModal from "./authModal/authModal";

const iconsRight: FC = () => {
   const { user } = useAuth()

   return (      
      <div className="relative flex items-center">
         {user ? (
             <>
             <ProfileMenu />
             <UploadSong />
            </> 
         ) : (            
            <AuthModal />
           
         )}                       
      </div>
   )
}

export default iconsRight