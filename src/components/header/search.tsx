'use client'

import { FC } from 'react';
import { Input } from '../ui/input';
import { useSearch } from '@/hooks/useSearch';
import SongItem from '../songItem/songItem';
import { cn } from '@/lib/utils';
import { useSidebarToggle } from '@/hooks/use-sidebar-toggle';
import useStore from '@/hooks/use-store';

const Search: FC = () => {
   const { data, handleSearch, searchTerm, isSuccess } = useSearch()

   const sidebar = useStore(useSidebarToggle, (state) => state);

   if (!sidebar) return null;

   return (
      <div className="">
         <Input
            className={cn("focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 ease-in-out",
               sidebar?.isOpen === false ? "sm:w-[400px] md:w-[400px] lg:w-[610px] xl:w-[1050px] 2xl:w-[1420px]" : "md:w-[400px] lg:w-[460px] xl:w-[900px] 2xl:w-[1260px]"
            )}
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