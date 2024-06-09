`use client`

import { FC } from "react";
import CommentItem from "./commentItem";
import { IComment } from "@/interfaces/comment.interface";
import { useAuth } from "@/hooks/UseAuth";
import AddCommentForm from "./addComment";

const Comments: FC<{ comments: IComment[], songId: number }> = ({
    comments,
    songId
}) => {   
    const user = useAuth()

    return (
        <div className="rounded-xl p-6 relative border">
            <div className="text-3xl font-semibold ">Комментарии</div>
            <div className="w-full h-0.5 my-4" />              
                <div className="rounded-xl bg-gray-800/5 p-6">
                {comments?.length ? (
                    <div className="">
                        {comments.map(comment => (
                            <CommentItem comment={comment} key={comment.id} />  
                        ))}
                    </div>
                ): (
                    <p>Комментарии не найдены</p>
                )}
                </div>
            <div className="mt-10">
                {user && <AddCommentForm songId={songId} />}
            </div>                              
        </div>
    )
}

export default Comments