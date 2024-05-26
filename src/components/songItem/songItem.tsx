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
 
const SongItem: FC<ISongItem> = ({ isSmall, isUpdateLink, removeHandler, item }) => {
    const { push } = useRouter()
    
    return (
        <Card className="w-[350px]">
            <CardHeader>                      
            </CardHeader>
            <CardContent>            
                {!!removeHandler && (
                <Button
                    className={'absolute bottom-3 right-3 z-10'}
                    onClick={() => removeHandler(item.id)}
                >
                    REMOVE
                </Button>
                )}

                {isUpdateLink && (
                <Button
                    className={'absolute bottom-3 right-3 z-10'}
                    onClick={() => push(`song/edit/${item.id}`)}
                >
                    EDIT
                </Button>
                )}
                <div>
                    {item.thumbnailPath && (
                        <Image 
                            src={item.thumbnailPath}
                            alt={item.name}
                            width={185}
                            height={103}
                            layout="responsive"
                        />
                    )}
                    <SongDuration duration={item.duration} />
                    {item?.user?.avatarPath && (
                        <div>
                            <Avatar>
                                <AvatarImage src={item.user.avatarPath}/>
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>
                    )}
                </div>

                <div>
                    {isSmall && <div>{item.user?.name}</div>}
                    <Link href={`/v/${item.id}`}>{item.name}</Link>
                        <SongStatistics 
                            listens={item.listens}
                            createdAt={isSmall ? item.createdAt : ''}
                        />
                </div>

            </CardContent>
            <CardFooter className="flex justify-between">         
            </CardFooter>
        </Card>
    )
}

export default SongItem