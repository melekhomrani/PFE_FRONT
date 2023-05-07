import { useQuery } from "@tanstack/react-query"
import axios from "../axios"

const getAllowedTypes = async () => {
  const res = await axios.get("/api/gest/reclamations/allowedTypes", {
    headers: { Authorization: 'Bearer ' + localStorage.getItem("token") },
  })
  return res.data;
}


const useGetAllowedTypes = () => {
  return useQuery({ queryKey: ["allowedTypes"], queryFn: getAllowedTypes });
}

export default useGetAllowedTypes;