import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "../axios"

export interface Role {
  name: string;
}

const createRole = async (role: Role) => {
  const res = await axios.post("/api/gest/roles", role, {
    headers: { Authorization: 'Bearer ' + localStorage.getItem("token") }
  }
  )
  return res.data;
}

const useCreateRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (role: Role) => createRole(role),
    mutationKey: ["createRole"],
    onSuccess: () => {
      queryClient.invalidateQueries(["roles"]);
    }
  });
}

export default useCreateRole;
