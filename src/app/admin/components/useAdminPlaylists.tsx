import { IListItem } from "@/interfaces/admin.interface";
import { PlaylistService } from "@/services/playlist.service";
import { playlistApi } from "@/store/api/api.playlist";
import { useQuery } from "react-query";

const useAdminPlaylists = () => {

  const { data, isFetching, refetch } = useQuery(
    ['playlists'], () => PlaylistService.getAllNewPlaylists(),
    {
      select: data => data.playlists.map((playlist): IListItem => {
        return {
          id: playlist.id,
          viewUrl: `playlists/${playlist.id}`,
          editUrl: `/admin/edit/playlist/${playlist.id}`,
          items: [
            playlist.name,
            playlist.genre,
            playlist.createdAt
          ]
        }
      })
    }
  )

  const [removePlaylist] = playlistApi.useDeletePlaylistMutation()

  return {
    removePlaylist,
    data,
    isFetching
  }
}

export default useAdminPlaylists;