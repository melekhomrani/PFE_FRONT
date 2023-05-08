import { useMutation } from "@tanstack/react-query";
import axios from "../axios";
import User from "../interfaces/User";

const deleteUser = async (user: User) => {
  const res = await axios.delete(`/api/gest/users/${user.id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};

const useDeleteUser = () => {
  return useMutation({ mutationFn: (user: User) => deleteUser(user), mutationKey: ["deleteUser"] })
}

export default useDeleteUser