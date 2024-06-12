import { FC } from "react";
import { PlaylistService } from "@/services/playlist.service";
import PlaylistsMain from "./components/playlistsMain";

async function getPlaylists() {

  const { playlists: playlists } = await PlaylistService.getAll({
    page: 1,
    perPage: 6, 
})

  return { playlists }
}

const PlaylistsPage: FC = async () => {
  const data = await getPlaylists()

  return (
    <div className="mt-12">
      <PlaylistsMain playlists={data.playlists} length={0} />
    </div>
  )
}

export default PlaylistsPage
