import { useMutation } from "@tanstack/react-query";
import axios from "../axios";

export interface UpdatePasswordProps {
  userId: number;
  oldPassword: string;
  newPassword: string;
}

const updatePassword = async ({ userId, oldPassword, newPassword }: UpdatePasswordProps) => {
  const response = await axios.put(`/api/gest/users/password/${userId}`, {

    oldPassword,
    newPassword
  }, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  });
  return response.data;
}

const useUpdatePassword = () => {
  return useMutation({
    mutationFn: updatePassword,
  })
}

export default useUpdatePassword