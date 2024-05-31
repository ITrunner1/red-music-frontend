`use client`

import { FC } from "react";
import CommentItem from "./commentItem";
import { IComment, ICommentDto } from "@/interfaces/comment.interface";
import { SubmitHandler, useForm } from "react-hook-form";
import { commentApi } from "@/store/api/api.comment";
import { useAuth } from "@/hooks/UseAuth";
import AddCommentForm from "./addComment";

const Comments: FC<{ comments: IComment[], songId: number }> = ({
    comments,
    songId
}) => {   
    const user = useAuth()

    return (
        <div className="rounded-xl p-5 relative">
            <h2>Комментарии</h2>
            <div className="w-full h-0.5 my-4" />                
            
                {comments?.length ? (
                    <div>
                        {comments.map(comment => (
                            <CommentItem comment={comment} key={comment.id} />  
                        ))}
                    </div>
                ): (
                    <p>Комментари не найдены</p>
                )}
            <div className="mt-10">
                {user && <AddCommentForm songId={songId} />}
            </div>                              
        </div>
    )
}

export default Comments