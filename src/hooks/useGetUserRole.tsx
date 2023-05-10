import { useQuery } from "@tanstack/react-query"
import axios from "../axios"

const getUserRole = async () => {
  const res = await axios.get("/api/gest/users/me", {
    headers: { Authorization: 'Bearer ' + localStorage.getItem("token") },
  })
  return res.data;
}

const useGetUserRole = (token: string) => {
  return useQuery({ queryKey: ["me", token], queryFn: () => getUserRole() });
}

export default useGetUserRole;