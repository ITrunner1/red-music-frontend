import { FC } from "react";
import { IComment } from "@/interfaces/comment.interface";
import ArtistInfoShort from "@/components/ui/artist-info-small";

const CommentItem: FC<{ comment: IComment }> = ({ comment }) => {
    return (
        <div className="pt-6 border rounded-lg p-4 mb-4">
            <ArtistInfoShort artist={comment.user} message={comment.text} />
        </div>
    )
}

export default CommentItem