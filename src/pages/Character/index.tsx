import type { ICharacter } from "../../interface/Character"
import { searchCharacterById } from "../../service/ApiService"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const Character =() =>{
    const navigate = useNavigate()
    const idUsuario = useParams()
    const iduser = idUsuario.id
    const id = Number(iduser)
    const {data:datos,isLoading,isError,error} = useQuery<ICharacter>({
        queryKey:['character',id],
        queryFn:()=>searchCharacterById(id)
    })

    if(isLoading) return <div>Cargando...</div>
    if(isError) return <div>Error :{ error.message}</div>
    
    const atras =()=>{
        navigate('/')
    }
    return(
        <div>
            <div>
                <button className="border bg-red-600 text-white font-bold" onClick={atras}>Atras</button>
                <ul>
                    <li><img src={datos?.image} alt="" /></li>
                    <li>{datos?.name}</li>
                    <li>{datos?.status}</li>
                    <li>{datos?.species}</li>
                    <li>{datos?.type}</li>
                    <li>{datos?.gender}</li>
                    <li>{datos?.type}</li>
                    <li>{datos?.episode.map((url,i) =>(
                        <a key={i} href={url}> Episodio {i}</a>
                    ))}</li>
                    <li>{datos?.created}</li>
                </ul>
            </div>
        </div>
    )
}
export default Character