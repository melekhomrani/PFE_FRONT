import { useQuery } from "@tanstack/react-query";
import axios from "../axios";

const isAdmin = async () => {
  const res = await axios.get("/api/gest/users/isadmin", {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
  return res.data;
}

const useIsAdmin = () => {
  return useQuery({ queryKey: ["isAdmin"], queryFn: isAdmin });
}

export default useIsAdmin