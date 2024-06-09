import { SongService } from "@/services/song.service";
import { ISong } from "@/interfaces/song.interface";
import { PlaylistService } from "@/services/playlist.service";
import shuffle from "lodash/shuffle";
import Home from "./components/home";

export async function getSongs() {

  const { data: topSongs } = await SongService.getMostPopular()
  const { data: newSongs } = await SongService.getAll()
  const { data: newPlaylists } = await PlaylistService.getAll()

  return {
    newSongs,
    newPlaylists,
    topSong: topSongs[0],
    randomSong:
      shuffle(newSongs.filter(s => s.id !== topSongs[0].id))[0] || ({} as ISong)
  } || []}

async function HomePage() {
  const data = await getSongs()

  return (
    <main className="min-h-[calc(100vh-57px-97px)]">
      <Home
        newSongs={data.newSongs}
        randomSong={data.randomSong}
        topSong={data.topSong}
        newPlaylists={data.newPlaylists} />
    </main>
  )
}

export default HomePage
