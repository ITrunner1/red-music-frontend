'use client'

import { ISong } from "@/interfaces/song.interface"
import { FC } from "react"
import LargeSongItem from "@/components/songItem/songLargeItem"

interface IDiscover {
  topSong: ISong,
  randomSong: ISong
}

const Discover: FC<IDiscover> = ({ topSong, randomSong }) => {
  return (
    <div className="flex gap-8 my-10">
      <div className="w-2/3 max-sm:hidden">
        <div className="text-3xl">Самая популярная песня</div>
        <LargeSongItem song={topSong} />
      </div>
      <div className="w-1/2 max-lg:hidden">
        <div className="text-3xl">Рандомная песня</div>
        <LargeSongItem song={randomSong} />
      </div>    
    </div>
  )
}

export default Discover