'use client'

import { FC, useState } from "react";
import ProfileModal from "./profileModal";
import AuthModal from "./authModal/authModal";
import { useAuth } from "@/hooks/UseAuth";
import UploadSongModal from "./uploadSong/uploadSongModal";
import UploadSongForm from "./uploadSong/UploadSongForm";
import DialogButton from "./uploadSong/dialogButton";
import { songApi } from "@/store/api/api.song";

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