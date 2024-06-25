import { TypePaginationPlaylists, TypePaginationSongs } from "@/interfaces/pagination.type";
import { MetadataRoute } from "next";

export const revalidate = 60;

async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const responseSongs = await fetch("https://red-music.fun/api/songs/all")
    const responsePlaylists = await fetch("https://red-music.fun/api/playlists/all")
    const { songs }: TypePaginationSongs = await responseSongs.json();
    const { playlists }: TypePaginationPlaylists = await responsePlaylists.json();
   
    const songsEntries: MetadataRoute.Sitemap = songs.map((song) => ({
        url: `https://red-music.fun/api/songs/song/${song.id}`,
        lastModified: new Date(song.createdAt)
    }))

    const playlistsEntries: MetadataRoute.Sitemap = playlists.map((playlist) => ({
        url: `https://red-music.fun/api/playlists/${playlist.id}`,
        lastModified: new Date(playlist.createdAt)
    }))

    return [
        {
            url: 'https://red-music.fun/home',
            lastModified: new Date(),
        },
        {
            url: 'https://red-music.fun/about-us',
            lastModified: new Date(),
        },
        {
            url: 'https://red-music.fun/write-to-us',
            lastModified: new Date(),
        },
        {
            url: 'https://red-music.fun/trands',
            lastModified: new Date(),
        },
        {
            url: 'https://red-music.fun/studio',
            lastModified: new Date(),
        },
        {
            url: 'https://red-music.fun/my-subscriptions',
            lastModified: new Date(),
        },
        {
            url: 'https://red-music.fun/liked-songs',
            lastModified: new Date(),
        },
        {
            url: 'https://red-music.fun/admin',
            lastModified: new Date(),
        },
        ...songsEntries,           
        ...playlistsEntries,

    ]
}

export default sitemap