'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ISongItem } from "@/interfaces/songItem.interface"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { FC } from "react"
import SongDuration from "./songDuration"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import Link from "next/link"
import SongStatistics from "./songStatistics"
import { ISong } from "@/interfaces/song.interface"
 
const LargeSongItem: FC<{song: ISong}> = ({ song }) => {
    const { push } = useRouter()
    
    return (
        <Card>
        <CardHeader>            
            {song?.thumbnailPath && (
                <Image 
                    src={song.thumbnailPath}
                    alt={song.name}
                    height={20}
                    width={20}
                    priority
                />
            )}    
            <SongDuration isBottom duration={song?.duration} />
        </CardHeader>
        <CardContent>             
            <div>               
                <Link href={`/v/${song?.id}`}>{song?.name}</Link>
                {song?.user?.avatarPath && 
                    <Avatar>
                        <AvatarImage src={song?.user?.avatarPath}/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>}
                <div>{song?.user?.name}</div>
                {/* <SongStatistics 
                    listens={song?.listens}
                    createdAt={song?.createdAt}
                /> */}
            </div>
        </CardContent>
        <CardFooter className="flex justify-between">            
        </CardFooter>
        </Card>
    )
}

export default LargeSongItem