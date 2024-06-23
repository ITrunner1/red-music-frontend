import Home from "./components/home";
import { IHome } from "@/interfaces/home.interfaces";
import { PlaylistService } from "@/services/playlist.service";
import { SongService } from "@/services/song.service";

export const revalidate = 60;

const getSongs = async () => {
  const { songs: songs } = await SongService.getAll({
    page: 1,
    perPage: 6,
  })
  const { playlists: playlists } = await PlaylistService.getAll({
    page: 1,
    perPage: 6,
  })

  return {
    songs,
    playlists,
  } || []
}

async function HomePage() {
  const data = await getSongs()

  return (
    <main className="">
      <Home initialSongs={{
        length: data.songs.length, songs: data.songs
      }}
        initialPlaylists={{ length: data.playlists.length, playlists: data.playlists }} />
    </main>
  )
}

export default HomePage
