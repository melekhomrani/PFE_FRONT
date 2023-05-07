import { useQuery } from "@tanstack/react-query";
import axios from "../axios";

const getAllUsers = async () => {
  const res = await axios.get("/api/gest/users", {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
  return res.data;
};
const useGetAllUsers = () => {
  return useQuery({ queryKey: ["users"], queryFn: getAllUsers });
}

export default useGetAllUsers;