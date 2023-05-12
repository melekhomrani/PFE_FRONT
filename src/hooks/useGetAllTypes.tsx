import { useQuery } from "@tanstack/react-query"
import axios from "../axios"

const getAllTypes = async () => {
  const res = await axios.get("/api/gest/reclamationTypes", {
    headers: { Authorization: 'Bearer ' + localStorage.getItem("token") },
  })
  return res.data;
}

const useGetAllTypes = () => {
  return useQuery({ queryKey: ["types"], queryFn: getAllTypes });
}

export default useGetAllTypes;