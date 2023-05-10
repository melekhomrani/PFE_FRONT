import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../axios";

const deleteRole = async (roleId: number) => {
  const res = await axios.delete(`/api/gest/roles/${roleId}`, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
  return res.data;
};

const useDeleteRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (roleId: number) => deleteRole(roleId),
    mutationKey: ["deleteRole"],
    onSuccess: () => {
      queryClient.invalidateQueries(["roles"]);
    }
  })
}

export default useDeleteRole