import { PlaylistService } from "@/services/playlist.service";
import TrandsMain from "./components/trands";
import { SongService } from "@/services/song.service"

async function getTopSongs() {

  const { songs: topSongs } = await SongService.getMostPopular({
    page: 1,
    perPage: 6
  })

  const { playlists: topPlaylists } = await PlaylistService.getMostPopular({
    page: 1,
    perPage: 6
  })

  return { topSongs, topPlaylists, revalidate: 60 }
}

async function Trands() {
  const data = await getTopSongs()

  return (
    <main className="">
      <div className="text-5xl max-sm:text-3xl">Популярное</div>
      <TrandsMain length={0} songs={data.topSongs} playlists={data.topPlaylists} />
    </main>
  )
}

export default Trands
