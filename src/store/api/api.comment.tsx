import { USERS } from "@/services/user.service";
import { api } from "./api";
import { IComment, ICommentDto } from "@/interfaces/comment.interface";

export const commentApi = api.injectEndpoints({
    endpoints: builder => ({
        subscribeToArtist: builder.mutation<IComment, ICommentDto>({
            query: body => ({
                url: 'comment',
                method: 'POST',
                body
            }),
            invalidatesTags: (result, error, { songId }) => [{type: 'Song', id: songId}]
        })
    })
})