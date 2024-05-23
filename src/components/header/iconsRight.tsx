'use client'

import { FC } from "react";
import ProfileModal from "./profileModal";
import UploadSongModal from "./uploadSongModal";
import AuthModal from "./authModal/authModal";
import { useAuth } from "@/hooks/UseAuth";

const iconsRight: FC = () => {
   const { user } = useAuth()

   return (      
      <div className="relative flex items-center">
         {user ? (
             <>
               <UploadSongModal />
               <ProfileModal />
             </>             
         ) : (            
            <AuthModal />
           
         )}                       
      </div>
   )
}

export default iconsRight