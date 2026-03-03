import { pageCharacters } from "../../service/ApiService"
import { searchCharacters } from '../../service/ApiService'
import { useQuery } from "@tanstack/react-query"
import type { IResponse } from "../../interface/Character"
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [pagina, setPagina] = useState(1)
    const [buscar, setBuscar] = useState("")
    const navigate = useNavigate()
    const id = Number(pagina)
    const { data: datos, isLoading, isError, error } = useQuery<IResponse>({
        queryKey: ['getcharacterid', id],
        queryFn: () => pageCharacters(id)
    })


    const { data: datosBusqueda, isLoading: loadingbusqueda, isError: errorBusqueda, error: errorMessage } = useQuery<IResponse>({
        queryKey: ['episodes', buscar],
        queryFn: () => searchCharacters(buscar),
        enabled: !!buscar
    })

    const data = datos?.results

    if (isLoading) return <div>Cargando datos....</div>
    if (isError) return <div>Error al taer los datos {error.message}</div>

    const busqueda = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBuscar(e.target.value)
    }
    const character = (id: number) => {
        navigate(`/characters/${id}`)
    }
    return (
        <section className="flex flex-col gap-5">
            <header>
                <h1 className="text-red-600 font-bold ">Lista de personajes</h1>
            </header>
            <nav className="flex gap-5 justify-between px-4">
                <input value={buscar} onChange={busqueda} className="border border-gray-500" type="text" placeholder="Buscar" />
                <div>
                    <button className="bg-green-500 text-white hover:font-bold rounded-b-md px-2 py-1 cursor-pointer hover:bg-green-400" onClick={() => setPagina(pagina - 1)}>Back</button>
                    <label htmlFor="">{pagina}</label>
                    <button className="bg-green-500 text-white hover:font-bold rounded-b-md px-2 py-1 cursor-pointer hover:bg-green-400" onClick={() => setPagina(pagina + 1)}>Next</button>
                </div>
            </nav>
            <article className=" flex flex-col gap-5 lg:grid lg:grid-cols-4 ">
                {
                    buscar ? datosBusqueda?.results.map(datosBusqueda => (
                        <ul className="border font-bold border-red-600 gap-5" key={datosBusqueda.id}>
                            <li><img src={datosBusqueda.image} alt="" /></li>
                            <li>{datosBusqueda.name}</li>
                            <li>{datosBusqueda.status}</li>
                            <li>{datosBusqueda.species}</li>
                            <li>{datosBusqueda.type}</li>
                            <li>{datosBusqueda.gender}</li>
                            <button onClick={() => character(datosBusqueda.id)}>Consultar</button>
                        </ul>
                    )) :
                        data?.map(datos => (
                            <div className="border font-bold border-red-600 gap-5" key={datos.id}>
                                <li><img className="w-100" src={datos.image} alt="" /></li>
                                <p>{datos.name}</p>
                                <p>{datos.status}</p>
                                <p>{datos.species}</p>
                                <p>{datos.type}</p>
                                <p>{datos.gender}</p>
                                <button className="bg-green-950 text-white p-2" onClick={() => character(datos.id)}>Consultar</button>
                            </div>
                        ))}
            </article>
        </section>
    )

}

export default Home