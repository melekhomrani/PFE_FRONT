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
  return useMutation({
    mutationFn: (params: loginParams) => login(params),
    mutationKey: ["login"]
  });
}

export default useLogin;