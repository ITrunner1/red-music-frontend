'use client'

import { FC } from "react";
import ProfileModal from "./profile/profileDropdown";
import AuthModal from "./authModal/authModal";
import { useAuth } from "@/hooks/UseAuth";
import UploadSongModal from "./uploadSong/uploadSongModal";
import CreatePlaylistModal from "./createPlaylist/createPlaylistModal";

const iconsRight: FC = () => {
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

export default iconsRight