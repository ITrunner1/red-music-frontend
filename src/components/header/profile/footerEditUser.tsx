import { Button } from "@/components/ui/button";
import { FC } from "react"
import { MdCheckCircle, MdUploadFile } from "react-icons/md";

const FooterUploadSong: FC<{
    percent: number;
    isUploaded: boolean
}> = ({ percent, isUploaded }) => {
    return (
        <div className="flex flex-wrap justify-between w-full">
            <div className="w-1/2">
                {isUploaded ?
                    <div>
                        <MdCheckCircle className="inline mr-2" size={36} />
                        <div className="inline align-middle">
                            Песня загружена
                        </div>
                    </div> : <div className="inline">
                        <MdUploadFile className="inline mr-2" size={36} />
                        <div className="inline align-middle">
                            Загружено ${percent}%...
                        </div>
                    </div>}
            </div>
            <div className="1/2">
                <Button>
                    Save
                </Button>
            </div>
        </div>
    )
}

export default FooterUploadSong