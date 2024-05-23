'use client'

import { useDebounce } from 'use-debounce';
import { ChangeEvent, FC, useState } from "react";
import { songApi } from '@/store/api/api.song';

export const useSearch = () => {
   const [ searchTerm, setSearchTerm ] = useState('')
   const [ debounceSearch ] = useDebounce(searchTerm, 500)

   const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value)
   }

   const { data, isSuccess } = songApi.useGetSongsBySearchTermQuery(debounceSearch, {
      skip: !debounceSearch,
      selectFromResult: ({ data, ...rest }) => ({
         data: data?.slice(0, 4),
         ...rest
      })
   })

   return { handleSearch, data, isSuccess, searchTerm } 
}

