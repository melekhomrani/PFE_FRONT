import { useMutation } from "@tanstack/react-query"
import axios from "../axios"

export interface Type {
  typeName: string;
  notify: Array<number>;
  create: Array<number>;
  consult: Array<number>;
  approbateur: Array<number>;
  validateur: Array<number>;
}

const createType = async (type: Type) => {
  const res = await axios.post("/api/gest/reclamationTypes/new", type, {
    headers: { Authorization: 'Bearer ' + localStorage.getItem("token") },
  })
  return res.data;
}

const useCreateType = () => {
  return useMutation({
    mutationFn: (type: Type) => createType(type),
    mutationKey: ["createType"]
  });
}

export default useCreateType;
