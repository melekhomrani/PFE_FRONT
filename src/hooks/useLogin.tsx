import axios from "../axios"
import { useMutation } from "@tanstack/react-query"

interface loginParams {
  email: string;
  password: string;
}

const login = async ({ email, password }: loginParams) => {
  const data = await axios.post("/api/auth/login", {
    email,
    password
  })
  return data;
}

const useLogin = () => {
  const { data, isLoading, error, mutateAsync } = useMutation({ mutationFn: login });
  return { mutate: mutateAsync, data, isLoading, error };
}

export default useLogin;