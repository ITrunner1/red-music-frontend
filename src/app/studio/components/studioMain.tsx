'use client'

import Catalog from "@/components/catalog";
import Loader from "@/components/ui/loader";
import { api } from "@/store/api/api";
import { songApi } from "@/store/api/api.song";
import { FC } from "react";

const StudioMain: FC = () => {
  const { data, isLoading } = api.useGetProfileQuery(null)
  const [ removeSong ] = songApi.useDeleteSongMutation()

  const songs = data?.songs

  return (
    <div className="mt-10">
      {isLoading ? (
        <Loader />
      ) : songs?.length ? (
        <Catalog newSongs={songs}          
          removeHadler={removeSong}
          isUpdateLink
        />
      ) : (
        <p>Музыка не найдена!</p>
      )}
    </div>
  )    
}

export default StudioMain
