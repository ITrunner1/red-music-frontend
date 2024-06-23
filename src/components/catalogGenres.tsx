'use client'
import { FC } from "react"
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle"
import { useQuery } from "react-query"
import { GenreService } from "@/services/genre.service."
import useStore from "@/hooks/use-store"
import { Link } from "@nextui-org/react"

const CatalogGenres: FC = () => {
    const { data, isLoading } = useQuery(
        ['get genres'],
        () => GenreService.getAll(),
        { select: ({ data }) => data }
    )

    const sidebar = useStore(useSidebarToggle, (state) => state);

    return (
        <div className="max-sm:w-[250px]">
            <div className="my-4 text-2xl max-sm:text-xl">Жанры</div>
            {data?.length ? (
                <div className="2xl:flex 2xl:gap-4 max-sm:flex max-sm:flex-wrap max-sm:gap-4 md:flex md:flex-wrap md:gap-4">
                    {data.map(genre => (
                        <Link key={genre.id} className="border border-white rounded-sm text-white p-2 text-xl" href={`genre/${genre.slug}`}>
                            {genre.name}
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="mb-6">
                    <div className="my-4">Жанров не существует</div>
                </div>
            )}
        </div>
    )
}

export default CatalogGenres