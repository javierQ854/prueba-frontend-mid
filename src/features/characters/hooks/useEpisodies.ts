import { useQuery } from '@tanstack/react-query'
import { characterApi } from '../api/character.api'
import type { Episode } from '../Types'

export function useEpisodes(ids: number[]) {
  return useQuery<Episode[]>({
    queryKey: ['episodes', ids],
    queryFn: () => characterApi.episodesByIds(ids),
    enabled: ids.length > 0,
    staleTime: 60_000
  })
}