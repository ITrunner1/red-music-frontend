import { FC } from 'react'
import { Skeleton } from "@/components/ui/skeleton"

const Loader: FC = () => {
    return (
        <Skeleton className='rounded-xl h-8 my-1' />
    )
}

export default Loader