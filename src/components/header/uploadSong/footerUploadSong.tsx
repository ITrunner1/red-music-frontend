import { Button } from "@/components/ui/button";
import { FC } from "react"
import { MdCheckCircle, MdUploadFile } from "react-icons/md";

const FooterUploadSong: FC<{ 
    percent: number;
    isUploaded: boolean
}> = ({ percent, isUploaded}) => {   
    return (
        <div>
           <div className="">

           </div>
           <MdUploadFile />
           <MdCheckCircle />
           <span>{isUploaded ? 'Песня загружена' : `Загружено ${percent}%...`}</span>
            <div>
                <Button>Save</Button>
            </div>

        </div>
    )
}

export default FooterUploadSong