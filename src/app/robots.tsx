import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: 'Yandex',      
      disallow: ['/admin'],
    },
    sitemap: 'https://red-music.fun/sitemap.xml',
  }
}