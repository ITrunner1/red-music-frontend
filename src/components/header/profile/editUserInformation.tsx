import Image from "next/image"
import { FC } from "react"

interface IUserInformation {
    avatarPath: string
}

const UploadUserInformation: FC<IUserInformation> = ({
    avatarPath,
}) => {
    return (
        <div className="text-white">            
            <Image
                src={avatarPath}
                alt={''}
                width={210}
                height={210}
                layout="responsive"
            />
        </div>
    )
}

export default UploadUserInformation