import Image from "next/image"
import Link from "next/link"
import { FC } from "react"

interface IPlaylistInformation {
    playlistId: number
    picturePath: string
}

const UploadPlaylistInformation: FC<IPlaylistInformation> = ({
    playlistId,
    picturePath,
}) => {
    return (
        <div className="text-white">
            <div className="">
                <Image
                    src={picturePath}
                    alt={''}
                    width={210}
                    height={210}
                    layout="responsive"
                />
            </div>
            <div>
                <div className="">
                    <span className="flex justify-center">
                        <Link href={`/playlists/${playlistId}`}>
                            Cсылка на плейлист: http://localhost:4200/playlists/{playlistId}
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default UploadPlaylistInformation