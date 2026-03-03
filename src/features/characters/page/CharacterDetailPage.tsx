import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useCharacter } from '../hooks/useCharacter'
import { useEpisodes } from '../hooks/useEpisodes' 
import { EpisodeList } from '../component/EpisodeList' 
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
    <section className="flex flex-col gap-6 p-6 bg-gray-50 rounded-lg shadow-md">
  <button
    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors shadow"
    onClick={() => navigate(from ?? `/?page=1`)}
  >
    Atrás
  </button>

  <div className="flex flex-col md:flex-row gap-6 items-center bg-white p-4 rounded-lg shadow-lg">
    <img
      src={character.image}
      alt={character.name}
      className="w-40 h-40 object-cover rounded-full border-2 border-gray-300"
    />

    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold text-gray-800">{character.name}</h2>
      <p className="text-gray-600"><span className="font-semibold">Status:</span> {character.status}</p>
      <p className="text-gray-600"><span className="font-semibold">Species:</span> {character.species}</p>
      <p className="text-gray-600"><span className="font-semibold">Gender:</span> {character.gender}</p>
      <p className="text-gray-600"><span className="font-semibold">Type:</span> {character.type || '-'}</p>
    </div>
  </div>

  <h3 className="text-xl font-bold text-gray-800">Episodios</h3>

  <EpisodeList
    episodes={episodesQuery.data ?? []}
    isLoading={episodesQuery.isLoading}
  />
</section>
  )
}

