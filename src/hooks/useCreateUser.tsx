import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from '../axios'

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: number;
}

const createUser = async (user: User) => {
  const res = await axios.post('/api/auth/register', user, {
    headers: { Authorization: "Bearer " + localStorage.getItem('token') },
  })
  return res.data
}

const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: User) => createUser(user),
    mutationKey: ["createUser"],
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    }
  })
}

export default useCreateUser