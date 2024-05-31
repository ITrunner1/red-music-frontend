import { FC } from "react";
import { IComment } from "@/interfaces/comment.interface";
import ArtistInfoShort from "@/components/ui/artist-info-small";

const CommentItem: FC<{ comment: IComment }> = ({ comment }) => {
    return (
        <div className="mt-7 first:text-xs last:text-base">
            <ArtistInfoShort artist={comment.user} message={comment.text} />
        </div>
    )
}

export default CommentItem