import { songApi } from '../../store/api/api.song'
import { FC, useState } from "react";
import { HiUpload } from 'react-icons/hi'

const uploadSongModal: FC = () => {
   const [songId, setSongId] = useState<number>(0)

   const [createSong, {isLoading}] = songApi.useCreateSongMutation()

   return (
      <>
         {/* <button
            className=''
            disabled={isLoading}
            onClick={() => {
               !createSong().unwrap().then(id => {
                  setSongId(+id)
               })
            }}
         >
            <HiUpload />
         </button> */}
      </>
   )
}

export default uploadSongModal;