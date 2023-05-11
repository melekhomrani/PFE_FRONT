import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "../axios"
import { Type } from "./useCreateType";

export interface UpdateType extends Type {
  id: number;
}

const updateType = async (type: UpdateType) => {
  const res = await axios.put(`/api/gest/reclamationTypes/${type.id}`, type, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
  return res.data;
}

const useUpdateType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateType,
    onSuccess: () => queryClient.invalidateQueries(["roles"])
  });
}

export default useUpdateType