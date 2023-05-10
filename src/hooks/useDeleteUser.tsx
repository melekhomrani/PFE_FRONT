import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../axios";

const deleteUser = async (userId: number) => {
  const res = await axios.delete(`/api/gest/users/${userId}`, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
  return res.data;
};

const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: number) => deleteUser(userId),
    mutationKey: ["deleteUser"],
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    }
  })
}

export default useDeleteUser