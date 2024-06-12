'use client'

import { FC } from 'react';
import { Input } from '../ui/input';
import { useSearch } from '@/hooks/useSearch';
import SongItem from '../songItem/songItem';

const Search: FC = () => {
   const { data, handleSearch, searchTerm, isSuccess } = useSearch()

   return (
      <div className="">
            <Input
               className="max-sm:w-[140px] max-md:w-[240px] max-lg:w-[340px] max-xl:w-[540px] w-[1200px] focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
               type="text"
               placeholder='Поиск...'
               value={searchTerm}
               onChange={handleSearch}
            />        
         {isSuccess && (
               <div className="flex justify-between gap-x-6 p-6 border-b-stone-500 bg-background shadow backdrop-blur dark:shadow-secondary">
                  {data?.length ? (
                     data?.map(song => <SongItem isSmall item={song} key={song.id} isOpen={false} />)
                  ) : (
                     <div className="">
                        Музыка не найдена!
                     </div>
                  )}
               </div>
         )}
      </div>
   )
}

export default Search;