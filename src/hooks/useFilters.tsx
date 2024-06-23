import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useActions } from "./useActions"
import { useTypedSelector } from "./useTypedSelector"
import { useEffect } from "react"
import { TypeSongDataFilters } from "@/interfaces/song.interface"

export const useFilters = () => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const { updateQueryParam } = useActions()
    const { replace } = useRouter()

    const { queryParams } = useTypedSelector(
        state => state.filters
    )

    useEffect(() => {
        searchParams.forEach((value, key) => {
            updateQueryParam({
                key: key as keyof TypeSongDataFilters,
                value
            })
        })
    }, [])

    const updateQueryParams = (key: keyof TypeSongDataFilters, value: string) => {
        const newParams = new URLSearchParams(searchParams.toString())

        if (value) {
            newParams.set(key, String(value))
        } else {
            newParams.delete
        }

        updateQueryParam({key, value})
    }

    return {        
        updateQueryParams,
        queryParams
    }
}







