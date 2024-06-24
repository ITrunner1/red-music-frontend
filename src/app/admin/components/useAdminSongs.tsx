import { IListItem } from "@/interfaces/admin.interface"
import { SongService } from "@/services/song.service"
import { songApi } from "@/store/api/api.song"
import { useQuery } from "react-query"

const useAdminSongs = () => {

  const { data, isFetching, refetch } = useQuery(
    ['songs'], () => SongService.getAllNewSongs(),
    {
      select: data => data.songs.map((song): IListItem => {
        return {
          id: song.id,
          viewUrl: `songs/song/${song.id}`,
          editUrl: `/admin/edit/song/${song.id}`,
          items: [
            song.name,
            song.genre,
            song.createdAt
          ]
        }
      })
    }
  )

  const [removeSong] = songApi.useDeleteSongMutation()

  return {
    removeSong,
    data,
    isFetching
  }
}

export default useAdminSongs;