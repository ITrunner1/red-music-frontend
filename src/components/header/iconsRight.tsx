'use client'

import { FC } from "react";
import ProfileModal from "./profile/profileDropdown";
import AuthModal from "./authModal/authModal";
import { useAuth } from "@/hooks/useAuth";
import UploadSongModal from "./uploadSong/uploadSongModal";
import CreatePlaylistModal from "./createPlaylist/createPlaylistModal";

const IconsRight: FC = () => {
   const { user } = useAuth()

   return (
      <div className="flex items-start gap-2">
         {user ? (
            <>
               <CreatePlaylistModal />
               <UploadSongModal />
               <ProfileModal />
            </>
         ) : (
            <AuthModal />
         )}
      </div>
   )
}

export default IconsRight