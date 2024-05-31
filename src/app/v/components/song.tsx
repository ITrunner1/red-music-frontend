'use client'

import { FC, useEffect } from "react";
import { ISong } from "@/interfaces/song.interface";
import { songApi } from "@/store/api/api.song";
import { useParams } from "next/navigation";
import Image from "next/image";
import MusicPlayer from "@/components/musicPlayer/musicPlayer";
import Comments from "@/components/comments/comments";
import SongDetail from "./songDetail";
import { IUser } from "@/interfaces/user.interface";
import { motion } from "framer-motion";

const SongMain: FC = () => {
    const params = useParams()

    const { data: song = {} as ISong } = songApi.useGetSongByIdQuery(Number(params.id), {
        skip: !params?.id
    })

    const [updateListens] = songApi.useUpdateListensMutation()

    useEffect(() => {
      if (params.id) updateListens(Number(params.id))
    }, [params.id])

  return (
    <motion.div className="mt-10 flex items-center">         
        <Image priority className="pb-10" src={song.thumbnailPath} alt={song.name} width={300} height={300} />            
      <div>
        <SongDetail song={song} artist={song.user || ({} as IUser)} />
        <Comments comments={song.comments || []} songId={song.id} />
      </div>
    </motion.div>
  )    
}

export default SongMain