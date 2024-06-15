'use client'

import { FC } from "react";
import AuthModal from "./authModal/authModal";
import { useAuth } from "@/hooks/useAuth";
import UploadSongModal from "./uploadSong/uploadSongModal";
import CreatePlaylistModal from "./createPlaylist/createPlaylistModal";
import ProfileDropdownMenu from "./profile/profileDropdown";

const IconsRight: FC = () => {
   const { user } = useAuth()

   return (
      <div className="flex items-start gap-2">
         {user ? (
            <>
               <CreatePlaylistModal />
               <UploadSongModal />
               <ProfileDropdownMenu />
            </>
         ) : (
            <AuthModal />
         )}
      </div>
   )
}

export default IconsRight