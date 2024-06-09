import { FC } from "react";
import { PlaylistService } from "@/services/playlist.service";
import PlaylistsMain from "./components/playlistsMain";

async function getPlaylists() {

  const { data: newPlaylists } = await PlaylistService.getAll()

  return { newPlaylists }
}

const PlaylistsPage: FC = async () => {
  const data = await getPlaylists()

  return (
    <div className="mt-12">
      <PlaylistsMain newPlaylists={data.newPlaylists} />
    </div>
  )
}

export default PlaylistsPage
