import { useQuery } from "@tanstack/react-query";
import axios from "../axios";

const getCanSetState = async (id: number) => {
  const res = await axios.get(`/api/gest/reclamations/canSetState/${id}`, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
  return res.data;
};
const useGetCanSetState = (id: number) => {
  return useQuery({ queryKey: ["canSetState", id], queryFn:()=> getCanSetState(id) });
}

export default useGetCanSetState;