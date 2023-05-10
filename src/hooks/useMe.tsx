import { useQuery } from "@tanstack/react-query";
import axios from "../axios";

const getMe = async () => {
  const res = await axios.get("/api/gest/users/me", {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
  return res.data;
}

const useMe = () => {
  return useQuery({ queryKey: ["me"], queryFn: () => getMe() });
}

export default useMe;