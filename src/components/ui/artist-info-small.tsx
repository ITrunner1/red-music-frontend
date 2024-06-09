import { FC } from "react";
import { IUser } from "@/interfaces/user.interface";
import formatNumberToK from "@/lib/format-number-to-k";
import Link from "next/link";
import { Avatar } from "@nextui-org/react";

const ArtistInfoShort: FC<{ artist: IUser; message?: string }> = ({
    artist,
    message
}) => {
    return (
        <div>
            <div className="inline-flex items-center">
                <div>
                    {artist.avatarPath &&
                        <Link href={`/user/${artist.id}`}>
                            <Avatar
                                color="primary"
                                isBordered
                                size="md"
                                src={artist.avatarPath}
                                alt={artist.avatarPath}
                                className="cursor-pointer">
                            </Avatar>
                        </Link>
                    }
                </div>
                <div className="ml-4 border-b-2 border-white">
                    {artist.name}
                </div>
            </div>
            <div>
                {message || formatNumberToK(artist.subscribersCount) + ' слушателей'}
            </div>
        </div>
    )
}

export default ArtistInfoShort