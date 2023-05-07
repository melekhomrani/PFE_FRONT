import { useQuery } from "@tanstack/react-query"
import axios from "../axios"

const getAllRoles = async () => {
  const res = await axios.get("/api/gest/roles", {
    headers: { Authorization: 'Bearer ' + localStorage.getItem("token") },
  })
  return res.data;
}


const useGetAllRoles = () => {
  return useQuery({ queryKey: ["roles"], queryFn: getAllRoles });
}

export default useGetAllRoles;