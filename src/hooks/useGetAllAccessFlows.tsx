import { useQuery } from "@tanstack/react-query";
import axios from "../axios";

const getAllAceessFlows = async () => {
  const res = await axios.get(`/api/gest/accessFlows`, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
  return res.data;
}

const useGetAllAccessFlows = () => {
  return useQuery({
    queryKey: ["allAccessFlows"],
    queryFn: () => getAllAceessFlows(),
  });
}

export default useGetAllAccessFlows;
