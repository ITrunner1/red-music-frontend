import { IListItem } from "@/interfaces/admin.interface"
import { SongService } from "@/services/song.service"
import { songApi } from "@/store/api/api.song"
import { useQuery } from "react-query"

const useAdminAllSongs = () => {

  const { data, isFetching, refetch } = useQuery(
    ['allSongs'], () => SongService.getAll(),
    {
      select: data => data.songs.map((song): IListItem => {
        return {
          id: song.id,
          viewUrl: `songs/song/${song.id}`,
          editUrl: `/songs/edit/${song.id}`,
          items: [
            song.name,
            song.genre,
            song.createdAt,
            song.rejectionReason,
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

export default useAdminAllSongs;