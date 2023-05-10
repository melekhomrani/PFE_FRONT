
import { useMutation } from "@tanstack/react-query"
import axios from "../axios"
import User from "../interfaces/User";


const updateUser = async (user: User) => {
  const res = await axios.put("/api/gest/users/" + user.id, user, {
    headers: { Authorization: 'Bearer ' + localStorage.getItem("token") },
  })
  return res.data;
}

const useUpdateUser = () => {
  return useMutation({
    mutationFn: (user: User) => updateUser(user),
    mutationKey: ["updateUser"]
  });
}

export default useUpdateUser;