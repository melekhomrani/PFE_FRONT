import { useQuery } from "@tanstack/react-query";
import axios from "../axios";

const getNeededReclamations = async () => {
  const res = await axios.get("/api/gest/reclamations/needed", {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
  return res.data;
}

const useGetAllNeededReclamations = () => {
  return useQuery({ queryKey: ["reclamations"], queryFn: getNeededReclamations });
}

export default useGetAllNeededReclamations;