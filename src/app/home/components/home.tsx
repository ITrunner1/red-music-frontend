'use client'

import { FC } from "react";
import { motion } from "framer-motion";
import { IHome } from "@/interfaces/home.interfaces";
import Catalog from "@/components/catalog";
import Pagination from "@/components/pagination";
import { useQuery } from "react-query";
import { SongService } from "@/services/song.service";
import { useFilters } from "@/hooks/useFilters";
import { PlaylistService } from "@/services/playlist.service";
import CatalogPlaylists from "@/components/catalogPlaylists";
import CatalogGenres from "@/components/catalogGenres";

const Home: FC<IHome> = ({ initialSongs, initialPlaylists }) => {

  const { queryParams, updateQueryParams } = useFilters()

  const { data: songs, isLoading } = useQuery(
    ['songs', queryParams], () => SongService.getAll(queryParams),
    {
      initialData: initialSongs,
    }
  )

  const { data: playlists } = useQuery(
    ['splaylists', queryParams], () => PlaylistService.getAll(queryParams),
    {
      initialData: initialPlaylists,
    }
  )

  return (
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="text-5xl max-sm:text-3xl">Главная</div>
      <CatalogGenres />
      <Catalog songs={songs!?.songs} />
      <CatalogPlaylists playlists={playlists!?.playlists || {}} />
      <Pagination
        numberPages={songs!?.length / +queryParams.perPage}
        currentPage={queryParams.page}
        changePage={page => updateQueryParams('page', page.toString())} />
    </motion.div>
  )
}

export default Home