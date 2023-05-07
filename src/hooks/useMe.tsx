import { useQuery } from "@tanstack/react-query";
import axios from "../axios";

const getMe = async (token: string) => {
  try {
    const me = await axios.get("/api/gest/users/me", { headers: { "Authorization": `Bearer ${token}` } });
    return me;
  } catch (error) {
    throw error;
  }
}

const useMe = (token: string) => {
  const { data, isLoading, error } = useQuery({ queryKey: ["me", token], queryFn: () => getMe(token) });
  return { data, isLoading, error };
}

export default useMe;