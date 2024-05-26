import { ISong } from "@/interfaces/song.interface"
import { FC } from "react"
import Heading from "./heading"
import SongItem from "../songItem/songItem"

const Catalog: FC<{
  newSongs: ISong[]
  removeHadler?: (songId: number) => void
  isUpdateLink?: boolean
}> = ({ newSongs, removeHadler, isUpdateLink }) => {
  return (
    <div>
      <div>
        <Heading title={removeHadler ? 'Моя музыка' : 'Рекомендации' }/>
      </div>

      <div className="flex gap-6 my-10">
        {newSongs.map(song => (
          <SongItem 
            item={song}
            key={song.id}
            removeHandler={removeHadler}
            isUpdateLink={isUpdateLink}
          />
        ))}
      </div>
    </div>
  )    
}

export default Catalog