import { MetadataRoute } from "next";

export function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://red-music.fun',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: 'https://red-music.fun/about-us',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: 'https://red-music.fun/write-to-us',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: 'https://red-music.fun/trands',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
    ]
}