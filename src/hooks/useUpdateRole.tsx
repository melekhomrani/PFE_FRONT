import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "../axios"

const updateRole = async (role: any) => {
  const res = await axios.put(`/api/gest/roles/${role.id}`, role, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
  return res.data;
}

const useUpdateRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateRole,
    onSuccess: () => queryClient.invalidateQueries(["roles"])
  });
}

export default useUpdateRole