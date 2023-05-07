import { useQuery } from '@tanstack/react-query'
import axios from "../axios"

const getUser = async (id: number) => {
  const res = await axios.get(`/api/gest/users/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return res.data;
}

const useGetUser = (id: number) => {
  return useQuery(['user', id], () => getUser(id));
}

export default useGetUser
