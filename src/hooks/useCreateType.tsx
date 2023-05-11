import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "../axios"

export interface Type {
  typeName: string;
  notify: Array<number>;
  create: Array<number>;
  consult: Array<number>;
  approve: Array<number>;
  validate: Array<number>;
}

const createType = async (type: Type) => {
  const res = await axios.post("/api/gest/reclamationTypes", type, {
    headers: { Authorization: 'Bearer ' + localStorage.getItem("token") },
  })
  return res.data;
}

const useCreateType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (type: Type) => createType(type),
    mutationKey: ["createType"],
    onSuccess: () => {
      queryClient.invalidateQueries(["types"]);
    }
  });
}

export default useCreateType;
