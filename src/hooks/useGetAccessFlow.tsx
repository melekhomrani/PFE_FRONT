import { useQuery } from "@tanstack/react-query";
import axios from "../axios";

const getAccessFlow = async (typeId: number) => {
  const res = await axios.get(`/api/gest/accessFlows/${typeId}`, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
  return res.data;
}

const useGetAccessFlow = (typeId: number) => {
  return useQuery({
    queryKey: ["accessFlows", typeId],
    queryFn: () => getAccessFlow(typeId),
  });
}

export default useGetAccessFlow;