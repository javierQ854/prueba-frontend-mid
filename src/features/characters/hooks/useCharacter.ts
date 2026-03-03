import { useQuery } from '@tanstack/react-query'
import { characterApi } from '../api/character.api'
import type { Character } from '../Types'
import { ApiError } from '@/lib/httpClient'

export function useCharacter(id: number) {
  return useQuery<Character, ApiError>({
    queryKey: ['character/', id],
    queryFn: () => characterApi.byId(id),
    enabled: !!id,
    staleTime: 60_000
  })
}