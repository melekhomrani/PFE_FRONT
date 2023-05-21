import { useParams } from "react-router-dom";
import useGetReclamation from "../hooks/useGetReclamation";
import { Box, Heading, Input, Text } from "@chakra-ui/react";
import useGetAllComments from "../hooks/useGetAllComments";
import { useState } from "react";
import useCreateComment from "../hooks/useCreateComment";
import { useQueryClient } from "@tanstack/react-query";


const ReclamationPage= () => {
    const {id} = useParams();
    const { isLoading, error, data } = useGetReclamation(id!);
    const {isLoading: isLoadingComments, error: errorComments, data: dataComments} = useGetAllComments(id!);
    const [comment, setComment] = useState<string>("");
    const mutation = useCreateComment();
    const queryClient = useQueryClient();
    const handlePostComment =async (e:any) => {
        e.preventDefault();
        const data = {
            reclamationId: Number(id),
            text: comment!
        }
        console.log(data);
        try {
            await mutation.mutateAsync(data);
        } catch (error) {
            console.log(error);
        }
        queryClient.invalidateQueries({ queryKey: ['comments'] })
    }

    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Error</div>
    if(id === undefined) return <div>Reclamation not found</div>
    return(
        <Box>
            <Heading>Reclamation id: {id}</Heading>
            <Box>
                <Text>Titre: {data?.title}</Text>
                <Text>Description: {data?.description}</Text>
                <Text>Progress: {data?.progress}</Text>
                <Text>Created at: </Text>
                <Text>Updated at: </Text>
                <Box border="4px">
                    {JSON.stringify(data)}
                </Box>
            </Box>
            <Box>
                <form onSubmit={handlePostComment}>
                    <Input onChange={(e)=>setComment(e.target.value)} type="text" placeholder="Comment" name="text" />
                </form>
                <Heading>Comments</Heading>
                {isLoadingComments && <div>Loading...</div>}
                {errorComments && <div>Error</div>}
                {dataComments && dataComments.length !=0 ? dataComments.map((comment: any) => (
                    <Box key={comment.id}>
                        <Text>Comment author: {comment.author.firstName}</Text>
                        <Text>Comment content: {comment.text}</Text>
                    </Box>
                )): <div>No comments</div>}
            </Box>
        </Box>
    )
};

export default ReclamationPage;