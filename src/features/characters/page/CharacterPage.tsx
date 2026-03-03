import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useCharacters } from '../hooks/useCharacters'
import { useDebounce } from '@/hooks/useDeBounse'
import { CharacterCard } from '../component/CharacterCard'
import { FiltersBar } from '../component/FilterBar'
import { Pagination } from '../component/Pagination'
import { ApiError } from '@/lib/httpClient'

export default function CharactersPage() {
    const navigate = useNavigate()
    const [params, setParams] = useSearchParams()
    const location = useLocation()

    const page = Number(
        new URLSearchParams(location.search).get('page') ?? '1'
    )
    const nameParam = params.get('name') ?? ''
    const speciesParam = params.get('species') ?? ''

    const [nameInput, setNameInput] = useState(nameParam)
    const [speciesInput, setSpeciesInput] = useState(speciesParam)

    const debouncedName = useDebounce(nameInput, 400)
    const debouncedSpecies = useDebounce(speciesInput, 400)

    useEffect(() => {
        const currentName = params.get('name') ?? ''
        const currentSpecies = params.get('species') ?? ''

        if (
            debouncedName === currentName &&
            debouncedSpecies === currentSpecies
        ) {
            return
        }

        const next = new URLSearchParams(params)

        if (debouncedName) next.set('name', debouncedName)
        else next.delete('name')

        if (debouncedSpecies) next.set('species', debouncedSpecies)
        else next.delete('species')

        next.set('page', '1')

        setParams(next)
    }, [debouncedName, debouncedSpecies, params])
    const query = useCharacters({
        page,
        name: nameParam || undefined,
        species: speciesParam || undefined
    })

    const goToDetail = (id: number) => {
        navigate(`characters/${id}`, {
            state: { from: location.pathname + location.search }
        })
    }

    if (query.isLoading && !query.data) {
        return <div>Cargando...</div>
    }

    if (query.isError) {
        const error = query.error as ApiError

        if (error.status === 404) {
            return (
                <div>
                    <h2>No hay resultados</h2>
                    <button onClick={() => {
                        setNameInput('')
                        setSpeciesInput('')
                    }}>
                        Limpiar filtros
                    </button>
                </div>
            )
        }

        return <div>Error: {error.message}</div>
    }

    const info = query.data?.info
    const characters = query.data?.results ?? []

    return (
        <section className="flex flex-col gap-6 items-center">
            <h1 className="text-2xl font-bold">Lista de personajes</h1>

            <FiltersBar
                name={nameInput}
                species={speciesInput}
                onNameChange={setNameInput}
                onSpeciesChange={setSpeciesInput}
            />

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {characters.map((character) => (
                    <CharacterCard
                        key={character.id}
                        character={character}
                        onClick={goToDetail}
                    />
                ))}
            </div>

            <Pagination
                page={page}
                hasPrev={!!info?.prev}
                hasNext={!!info?.next}
                onPrev={() => {
                    const next = new URLSearchParams(params)
                    next.set('page', String(page - 1))
                    setParams(next)
                }}
                onNext={() => {
                    const next = new URLSearchParams(params)
                    next.set('page', String(page + 1))
                    setParams(next)
                }}
            />
        </section>
    )
}