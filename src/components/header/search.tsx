'use client'

import { FC } from 'react';
import { Input } from '../ui/input';
import { useSearch } from '@/hooks/useSearch';

const Search: FC = () => {
   const { data, handleSearch, searchTerm, isSuccess } = useSearch()

   return (
      <div className="">            
            <Input 
               className="w-[1000px] focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0" 
               type="text"
               placeholder='Поиск...'
               value={searchTerm}
               onChange={handleSearch}
            />
         {isSuccess && (
            <div className="">
               <div className="mr-4 last:mr-8">
                  {data?.length ? (
                     data.map(song => <div>{song.name}</div>)
                     // data.map(song => <SongItem isSmall item={song} key={song.id } />)
                  ) : (
                     <div className="">
                        Музыка не найдена!
                     </div>
                  )}
               </div>
            </div>
         )}                 
      </div>
   )
}

export default Search;