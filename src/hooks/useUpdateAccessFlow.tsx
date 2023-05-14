import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "../axios"

export interface AccessFlow {
  id: number;
  reclamationTypeId: number;
  notifyId: Array<number>;
  createId: Array<number>;
  consultId: Array<number>;
  approveId: Array<number>;
  validateId: Array<number>;
}

interface UpdateAccessFlowProps {
  accessFlowId: number;
  accessFlow: AccessFlow;
}

const updateAccessFlow = async ({ accessFlowId, accessFlow }: UpdateAccessFlowProps) => {
  const res = await axios.put(`/api/gest/accessFlows/${accessFlowId}`, accessFlow, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
  return res.data;
}

const useUpdateAccessFlow = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAccessFlow,
    onSuccess: () => queryClient.invalidateQueries(["accessFlows"])
  });
}

export default useUpdateAccessFlow