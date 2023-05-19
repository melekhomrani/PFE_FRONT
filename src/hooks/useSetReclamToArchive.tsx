import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "../axios"
import Progress from "../interfaces/EnumProgress";
import Reclamation from "../interfaces/Reclamation";

const setArchive = async (reclamId: number) => {
  const res = await axios.put(`/api/gest/reclamations/progress/${reclamId}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json"
    },
  });
  return res.data;
}

const useSetArchive = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: setArchive,
    onSuccess: () => queryClient.invalidateQueries(["reclamations"])
  });
}

export default useSetArchive