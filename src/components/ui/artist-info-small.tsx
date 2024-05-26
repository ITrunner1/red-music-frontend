import { FC } from "react";
import { IUser } from "@/interfaces/user.interface";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
import formatNumberToK from "@/lib/format-number-to-k";

const ArtistInfoShort: FC<{ artist: IUser; message?: string}> = ({
    artist,
    message
}) => {
    return (
        <div>
            {artist.avatarPath && 
            <Avatar>
                <AvatarImage src={artist.avatarPath} alt={artist.avatarPath} />
                <AvatarFallback>{artist.avatarPath} </AvatarFallback>
            </Avatar>}
            <div>
                <div>
                    {artist.name}
                </div>
                <div>
                    {message || formatNumberToK(artist.subscribersCount) + ' subscribers'} 
                </div>
            </div>
        </div>
    )
}

export default ArtistInfoShort