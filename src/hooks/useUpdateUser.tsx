import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "../axios"

export interface UserUpdate {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: number;
}

const updateUser = async (user: UserUpdate) => {
  const res = await axios.put("/api/gest/users/" + user.id, user, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  })
  return res.data;
}

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: UserUpdate) => updateUser(user),
    mutationKey: ["updateUser"],
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    }
  });
}

export default useUpdateUser;