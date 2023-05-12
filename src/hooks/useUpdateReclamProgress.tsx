import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "../axios"
import Progress from "../interfaces/EnumProgress";
import Reclamation from "../interfaces/Reclamation";

export interface UpdateReclamProgressProps {
  reclamId: number;
  progress: Progress;
}

const UpdateReclamProgress = async ({ reclamId, progress }: UpdateReclamProgressProps) => {
  const res = await axios.put(`/api/gest/reclamations/progress/${reclamId}`, progress, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json"
    },
  });
  return res.data;
}

const useUpdateReclamProgress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UpdateReclamProgress,
    onSuccess: () => queryClient.invalidateQueries(["reclamations"])
  });
}

export default useUpdateReclamProgress