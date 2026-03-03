import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useCharacter } from '../hooks/useCharacter'
import { useEpisodes } from '../hooks/useEpisodies' 
import { EpisodeList } from '../component/EpisodiList' 
import { ApiError } from '@/lib/httpClient'

function extractEpisodeIds(urls: string[]): number[] {
  return urls
    .map((url) => Number(url.split('/').pop()))
    .filter((n) => Number.isFinite(n))
}

export default function CharacterDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const from = (location.state as { from?: string } | null)?.from

  const characterId = Number(id)

  const characterQuery = useCharacter(characterId)

  const episodeIds = extractEpisodeIds(
    characterQuery.data?.episode ?? []
  )

  const episodesQuery = useEpisodes(episodeIds)

  if (characterQuery.isLoading) {
    return <div>Cargando personaje...</div>
  }

  if (characterQuery.isError) {
    const error = characterQuery.error as ApiError

    if (error.status === 404) {
      return <div>Este personaje no existe.</div>
    }

    return <div>Error: {error.message}</div>
  }

  const character = characterQuery.data!

  return (
    <section className="flex flex-col gap-6">
      <button
        className="border px-3 py-1"
        onClick={() => navigate(from ?? `/?page=1`)}
      >
        Atrás
      </button>

      <div className="flex gap-6">
        <img src={character.image} alt={character.name} />

        <div>
          <h2 className="text-2xl font-bold">{character.name}</h2>
          <p>Status: {character.status}</p>
          <p>Species: {character.species}</p>
          <p>Gender: {character.gender}</p>
          <p>Type: {character.type || '-'}</p>
        </div>
      </div>

      <h3 className="text-xl font-bold">Episodios</h3>

      <EpisodeList
        episodes={episodesQuery.data ?? []}
        isLoading={episodesQuery.isLoading}
      />
    </section>
  )
}