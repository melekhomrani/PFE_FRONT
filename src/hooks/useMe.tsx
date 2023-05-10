import { useQuery } from "@tanstack/react-query";
import axios from "../axios";

const getMe = async () => {
  const res = await axios.get("/api/gest/users/isadmin", {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
  return res.data;
}

const useMe = (token: string) => {
  return useQuery({ queryKey: ["me", token], queryFn: () => getMe() });
}

export default useMe;