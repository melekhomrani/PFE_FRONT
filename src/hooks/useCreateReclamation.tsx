import { useMutation } from "@tanstack/react-query";
import axios from "../axios";

export interface Reclamation {
    typeId: number;
    object: string;
    description: string;
}

const createReclamation = async (reclamation: Reclamation) => {
    const res = await axios.post("/api/gest/reclamations", reclamation, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } });
    return res.data;
}

const useCreateReclamation = () => {
    return useMutation({ mutationFn: (reclamation: Reclamation) => createReclamation(reclamation), mutationKey: ["createReclamation"] });
}

export default useCreateReclamation;