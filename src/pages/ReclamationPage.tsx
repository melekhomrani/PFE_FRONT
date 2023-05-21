import { useParams } from "react-router-dom";
import useGetReclamation from "../hooks/useGetReclamation";


const ReclamationPage= () => {
    const {id} = useParams();
    const { isLoading, error, data } = useGetReclamation(id!);

    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Error</div>
    if(id === undefined) return <div>Reclamation not found</div>
    return(
        <div>
            <h1>Reclamation {id}</h1>
            <p>{data?.description}</p>
        </div>
    )
};

export default ReclamationPage;