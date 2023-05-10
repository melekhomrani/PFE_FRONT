import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../axios";

const deleteType = async (typeId: number) => {
  const res = await axios.delete(`/api/gest/reclamationTypes/${typeId}`, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
  return res.data;
};

const useDeleteRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (typeId: number) => deleteType(typeId),
    mutationKey: ["deleteType"],
    onSuccess: () => {
      queryClient.invalidateQueries(["types"]);
    }
  })
}

export default useDeleteRole