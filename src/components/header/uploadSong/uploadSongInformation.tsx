import Image from "next/image"
import Link from "next/link"
import { FC } from "react"

interface ISongInformation {
    songId: number
    thumbnailPath: string
    fileName: string
    isUploaded: boolean
}

const UploadSongInformation: FC<ISongInformation> = ({
    songId,
    thumbnailPath,
    fileName,
    isUploaded
}) => {
    return (
        <div>  
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
            <div>
                <div>
                    <span>Будущая ссылка на песню</span>
                    <span>
                        <Link href={`/v/${songId}`}>
                            http://localhost:4200/v/{songId}
                        </Link>
                    </span>
                </div>
                <div>
                    <span>Имя файла</span>
                    <span>{fileName}</span>
                </div>
            </div>
        </div>
    )
}

export default UploadSongInformation