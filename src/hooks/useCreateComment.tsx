import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from '../axios'

export interface Comment {
    reclamationId: number
    text: string
}

const createComment = async (comment: Comment) => {
    console.log(comment.text)
    const res = await axios.post(`/api/gest/comments/${comment.reclamationId}`, comment.text, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
    })
    return res.data
}

const useCreateComment = () => {
    return useMutation({
        mutationFn: (comment: Comment) => createComment(comment),
        mutationKey: ['comments'],
    })
}

export default useCreateComment
