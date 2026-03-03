import type { Episode } from '../Types'

interface Props {
  episodes: Episode[]
  isLoading: boolean
}

export function EpisodeList({ episodes, isLoading }: Props) {
  if (isLoading) return <div>Cargando episodios...</div>

  return (
    <div className="flex flex-col gap-4">
      {episodes.map((e) => (
        <div
          key={e.id}
          className="
            bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300
            hover:scale-105  hover:rotate-1 hover:shadow-2xl cursor-pointer
          "
        >
          <div className="p-4">
            <div className="font-bold text-lg mb-1">
              {e.episode} - {e.name}
            </div>
            <div className="text-sm text-gray-600 opacity-80">
              {e.air_date}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}