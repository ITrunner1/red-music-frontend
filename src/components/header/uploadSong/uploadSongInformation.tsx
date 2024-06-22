import Image from "next/image"
import { FC } from "react"

interface ISongInformation {
    thumbnailPath: string
    isUploaded: boolean
}

const UploadSongInformation: FC<ISongInformation> = ({
    thumbnailPath,
    isUploaded
}) => {
    return (
        <div className="">
            {!thumbnailPath ? (
                <div>
                    {!isUploaded
                        ? 'Идет загрузка песни'
                        : 'Необходимо загрузить обложку песни'
                    }
                </div>
            ) : (
                <Image
                    src={thumbnailPath}
                    alt={''}
                    width={210}
                    height={210}
                    layout="responsive"
                />
            )}
        </div>
    )
}

export default UploadSongInformation