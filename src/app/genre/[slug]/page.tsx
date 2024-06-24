import { IPageSlugParam, TypeParamSlug } from "@/interfaces/page-params"
import { GenreService } from "@/services/genre.service."
import { SongService } from "@/services/song.service"
import GenreMain from "./genrePage";
import { PlaylistService } from "@/services/playlist.service";

export const revalidate = 60;

// export async function generateStaticParams() {
//     const genres = await GenreService.getAll()

//     const paths = genres.data.map(genre => {
//         return {
//             params: { slug: genre.slug }
//         }
//     })

//     return paths
// }

async function getSongs(params: TypeParamSlug) {
    const { data: songs } = await SongService.getByGenre(
        params.slug as string
    )

    const { data: playlists } = await PlaylistService.getByGenre(
        params.slug as string
    )

    return { songs, playlists } || []
}

export default async function GenrePage({ params }: IPageSlugParam) {
    const data = await getSongs(params)

    return (
        <GenreMain songs={data.songs.songs} playlists={data.playlists.playlists} />
    )
}

