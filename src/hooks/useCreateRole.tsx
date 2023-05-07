import { useMutation } from "@tanstack/react-query"
import axios from "../axios"

export interface Role {
  name: string;
}

const createRole = async (role: Role) => {
  const res = await axios.post("/api/gest/roles", role)
  return res.data;
}

const useCreateRole = () => {
  return useMutation({
    mutationFn: (role: Role) => createRole(role),
    mutationKey: ["createRole"]
  });
}

export default useCreateRole;
