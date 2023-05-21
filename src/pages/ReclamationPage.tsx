import { useParams } from "react-router-dom";
import useGetReclamation from "../hooks/useGetReclamation";
import { Avatar, Box, Button, Divider, Flex, Heading, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import useGetAllComments from "../hooks/useGetAllComments";
import { useState } from "react";
import useCreateComment from "../hooks/useCreateComment";
import { useQueryClient } from "@tanstack/react-query";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useMe from "../hooks/useMe";


const ReclamationPage = () => {
  const { isLoading: isLoadingUser, error: errorUser, data: user } = useMe();
  const { id } = useParams();
  const { isLoading, error, data } = useGetReclamation(id!);
  let { isLoading: isLoadingComments, error: errorComments, data: dataComments } = useGetAllComments(id!);
  const [comment, setComment] = useState<string>("");
  const mutation = useCreateComment();
  const queryClient = useQueryClient();
  const handlePostComment = async (e: any) => {
    e.preventDefault();
    const data = {
      reclamationId: Number(id),
      text: comment!
    }
    console.log(data);
    try {
      await mutation.mutateAsync(data);
      e.target.reset();
    } catch (error) {
      console.log(error);
    }
    queryClient.invalidateQueries({ queryKey: ['comments'] })
  }

  dataComments = dataComments && dataComments.sort((a: any, b: any) => {
    return new Date(b.dateCreation).getTime() - new Date(a.dateCreation).getTime()
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error</div>
  if (id === undefined) return <div>Reclamation not found</div>
  return (
    <Box>
      <Header />
      <Flex minH={"77vh"} justifyContent={"center"} alignItems="center">
        <Box

          display={{ base: "block", md: "flex" }}
          flexDirection="column"
          justifyContent="flex-start"
          maxW="90vw" minW={"80vw"}
          bgColor={"green"} bg="#f5f8f9" my="5" borderRadius="md"
          boxShadow="md" border={"1px"} borderColor="gray.300">
          <Box py={10} bg="gray.100" px={{ base: '4', lg: '8' }}>
            <Heading mb={8}>Reclamation id: {id}</Heading>
            <Box>
              <Box>
                <VStack spacing="1rem">
                  <Flex direction="column" align="flex-start" w="100%">
                    <Box mb="2" fontSize="sm" fontWeight="bold">
                      Author
                    </Box>
                    <Box ps="1" fontSize="sm" color="gray.500">
                      {data.author.firstName} {data.author.lastName}
                    </Box>
                  </Flex>

                  <Flex direction="column" align="flex-start" w="100%">
                    <Box mb="2" fontSize="sm" fontWeight="bold">
                      Type
                    </Box>
                    <Box ps="1" fontSize="sm" color="gray.500">
                      {data.type.typeName}
                    </Box>
                  </Flex>

                  <Flex direction="column" align="flex-start" w="100%">
                    <Box mb="2" fontSize="sm" fontWeight="bold">
                      Subject
                    </Box>
                    <Box ps="1" fontSize="sm" color="gray.500">
                      {data.subject}
                    </Box>
                  </Flex>

                  <Flex direction="column" align="flex-start" w="100%">
                    <Box mb="2" fontSize="sm" fontWeight="bold">
                      Description
                    </Box>
                    <Box ps="1" fontSize="sm" color="gray.500">
                      {data.description}
                    </Box>
                  </Flex>
                  <Flex direction="column" align="flex-start" w="100%">
                    <Box mb="2" fontSize="sm" fontWeight="bold">
                      Status
                    </Box>
                    <Box ps="1" fontSize="sm" color="gray.500">
                      {data.progress}
                    </Box>
                  </Flex>
                  <Flex direction="column" align="flex-start" w="100%">
                    <Box mb="2" fontSize="sm" fontWeight="bold">
                      Created at
                    </Box>
                    <Box ps="1" fontSize="sm" color="gray.500">
                      {data.dateCreation.toLocaleString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </Box>
                  </Flex>
                  <Flex direction="column" align="flex-start" w="100%">
                    <Box mb="2" fontSize="sm" fontWeight="bold">
                      Updated at
                    </Box>
                    <Box ps="1" fontSize="sm" color="gray.500">
                      {data.dateUpdate.toLocaleString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </Box>
                  </Flex>
                </VStack>

              </Box>
            </Box>
            <Divider my={4} />
            <Box>
              <form onSubmit={handlePostComment}>
                <Flex alignItems="center">
                  {!isLoadingUser && user ?
                    (<Avatar name={`${user.firstName} ${user.lastName}`} src="your-avatar.jpg" />)
                    :
                    (<Avatar name="Your Name" src="your-avatar.jpg" />)
                  }
                  <Box ml={2} flex="1">
                    <Input placeholder="Write a comment..." resize="none" onChange={(e) => setComment(e.target.value.trim())} name="text" />
                  </Box>
                </Flex>
                <Flex justify={"flex-end"}>
                  <Button type="submit" mt={2} colorScheme="blue" size="sm">
                    Post Comment
                  </Button>
                </Flex>
              </form>
              <Heading mb="8">Comments</Heading>
              {isLoadingComments && <div>Loading...</div>}
              {errorComments && <div>Error</div>}
              {dataComments && dataComments.length != 0 ? dataComments.map((comment: any) => (
                <Box key={comment.id}>
                  <Flex mb={4} alignItems="center">
                    <Avatar name={`${comment.author.firstName} ${comment.author.lastName}`} src="user2.jpg" />
                    <Box ml={2}>
                      <Text fontWeight="bold">{`${comment.author.firstName} ${comment.author.lastName}`}</Text>
                      <Text fontSize="sm">{comment.text}</Text>
                    </Box>
                  </Flex>
                </Box>
              )) : <div>No comments</div>}
            </Box>
          </Box>
        </Box>
      </Flex >
      <Footer />
    </Box >
  )
};

export default ReclamationPage;