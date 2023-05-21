import { useQuery } from "@tanstack/react-query";
import axios from "../axios";

const getCalendarData = async () => {
  const res = await axios.get(`/api/gest/reclamations/calendar?start=2023-05-19&end=2023-05-22`, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
  return res.data;
}

const useGetCalendarData = () => {
  return useQuery({ queryKey: ["calendar"], queryFn:getCalendarData });
}

export default useGetCalendarData;