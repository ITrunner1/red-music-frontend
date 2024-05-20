import { useAuth } from "@/hooks/UseAuth";
import { FC } from "react";
import { Button } from "@/components/ui/button"
import ProfileMenu from "./profile-menu";
import UploadSong from "./upload-song";
import AuthModal from "./authModal/authModal";

const iconsRight: FC = () => {
   const user = useAuth()

   return (      
      <div className="relative flex items-center">
         {user? (
               <AuthModal />
         ) : (            
            <>
               <ProfileMenu />
               <UploadSong />
            </>
         )}                       
      </div>
   )
}

export default iconsRight