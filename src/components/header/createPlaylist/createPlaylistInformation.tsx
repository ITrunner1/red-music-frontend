import Image from "next/image"
import Link from "next/link"
import { FC } from "react"

interface IPlaylistInformation {
    picturePath: string    
}

const CreatePlaylistInformation: FC<IPlaylistInformation> = ({
    picturePath,    
}) => {
    return (
        <div>
            <Image
                src={picturePath}
                alt={''}
                width={210}
                height={210}
                layout="responsive"
            />
        </div>
    )
}

export default CreatePlaylistInformation