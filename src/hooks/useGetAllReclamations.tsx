import { useQuery } from "@tanstack/react-query";
import axios from "../axios";

const getReclamations = async () => {
  const res = await axios.get("/api/gest/reclamations", {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
  return res.data;
}

const useGetAllReclamations = () => {
  return useQuery({ queryKey: ["reclamations"], queryFn: getReclamations });
}

export default useGetAllReclamations;