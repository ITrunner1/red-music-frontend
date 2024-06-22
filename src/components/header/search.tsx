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
               className="sm:w-[400px] md:w-[400px] lg:w-[610px] xl:w-[1050px] 2xl:w-[1340px] focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
               type="text"
               placeholder='Поиск...'
               value={searchTerm}
               onChange={handleSearch}
            />        
         {isSuccess && (
               <div className="max-sm:flex-col flex justify-between gap-x-6 p-6 border-b-stone-500 bg-background shadow backdrop-blur dark:shadow-secondary">
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