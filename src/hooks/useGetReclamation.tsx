import { useQuery } from "@tanstack/react-query";
import axios from "../axios";

const getReclamation = async (id: string) => {
  const res = await axios.get(`/api/gest/reclamations/${id}`, {
    headers: { Authorization: 'Bearer ' + localStorage.getItem("token") },
  })
  return res.data;
}

const useGetReclamation = (id: string) => {
  return useQuery({ queryKey: ["reclamation", id], queryFn: () => getReclamation(id) });
}

export default useGetReclamation;