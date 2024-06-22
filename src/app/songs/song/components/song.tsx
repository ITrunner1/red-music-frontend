'use client'

import { FC, useEffect } from "react";
import { ISong } from "@/interfaces/song.interface";
import { songApi } from "@/store/api/api.song";
import { useParams } from "next/navigation";
import { IUser } from "@/interfaces/user.interface";
import Comments from "@/components/comments/comments";
import SongDetail from "./songDetail";

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
    <div className="my-4 flex flex-wrap gap-x-12 justify-center max-sm:justify-start max-sm:flex-col max-sm:gap-y-4 max-md:flex-col max-md:gap-y-4">
      <div className="w-1/2 max-sm:w-full max-md:w-full">
        <SongDetail song={song} artist={song.user || ({} as IUser)} />
      </div>
      <div className="w-1/3 max-sm:w-full max-md:w-full">
        <Comments comments={song.comments || []} songId={song.id} />
      </div>
    </div>
  )
}

export default SongMain