'use client'

import { MdOpenInFull } from "react-icons/md";
import { Button } from "@/components/ui/button"
import { ISongItem } from "@/interfaces/songItem.interface"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { FC } from "react"
import SongDuration from "./songDuration"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import Link from "next/link"
import SongStatistics from "./songStatistics"
import { motion } from "framer-motion";
 
const SongItem: FC<ISongItem> = ({ isSmall, isUpdateLink, removeHandler, item }) => {
    const { push } = useRouter()
    
    return (        
        <div className="w-[240px] mt-6 flex flex-col items-center border-white border-2 rounded-xl">
            <div className="mt-2 w-[210px] h-[210px]">                           
                <Image                    
                    className="rounded-xl"
                    src={item.thumbnailPath}
                    alt={item.name}
                    width={210}
                    height={210}  
                    priority   
                />                                                       
            </div>  
            <motion.div 
                className="absolute ml-36 mt-56"
                whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
                {item?.user?.avatarPath && (                    
                    <Avatar>                        
                        <Link href={`/c/${item.user.id}`}>
                            <AvatarImage src={item.user.avatarPath}/>
                        </Link>
                        <AvatarFallback>{item.user.name}</AvatarFallback>
                    </Avatar>                   
                )}
            </motion.div>  
             
            <motion.div
                className="absolute ml-44 mt-72"
                whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}
            >
                <Link href={`/v/${item.id}`}>                                
                    <MdOpenInFull className="" size={26}/>                
                </Link> 
            </motion.div>         
            <div className="my-4">  
                <div>                    
                    {isSmall && <div>{item.user?.name}</div>}
                    <div>{item.name}</div>
                        <SongStatistics 
                            listens={item.listens}
                            createdAt={isSmall ? item.createdAt : ''}
                        />
                </div>   
                <SongDuration duration={item.duration} />             
                <div className="mt-2">                    
                {!!removeHandler && (
                    <Button
                        className={'bg-black z-10'}
                        onClick={() => removeHandler(item.id)}
                    >
                        REMOVE
                    </Button>
                    )}
                    {isUpdateLink && (
                    <Button
                        className={'bg-black z-10'}
                        onClick={() => push(`song/edit/${item.id}`)}
                    >
                        EDIT
                    </Button>
                    )}                     
                </div>                              
            </div>            
        </div>   
    )
}

export default SongItem