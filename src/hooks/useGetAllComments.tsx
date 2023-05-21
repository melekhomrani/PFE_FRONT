import { useQuery } from "@tanstack/react-query";
import axios from "../axios";

const getAllComments = async (id: string) => {
  const res = await axios.get(`/api/gest/comments/${id}`, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
  return res.data;
}

const useGetAllComments = (id: string) => {
  return useQuery({ queryKey: ["comments", id], queryFn:()=> getAllComments(id) });
}

export default useGetAllComments;