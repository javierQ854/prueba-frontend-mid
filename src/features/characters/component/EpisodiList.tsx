import type { Episode } from '../Types'

interface Props {
  episodes: Episode[]
  isLoading: boolean
}

export function EpisodeList({ episodes, isLoading }: Props) {
  if (isLoading) return <div>Cargando episodios...</div>

  return (
    <div className="flex flex-col gap-3">
      {episodes.map((e) => (
        <div key={e.id} className="border p-3">
          <div className="font-bold">
            {e.episode} - {e.name}
          </div>
          <div className="text-sm opacity-70">
            {e.air_date}
          </div>
        </div>
      ))}
    </div>
  )
}