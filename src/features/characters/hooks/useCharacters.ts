import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { characterApi } from '../api/character.api'
import type { ApiListResponse, Character } from '../Types'
import { ApiError } from '@/lib/httpClient'

export function useCharacters(params: {
  page: number
  name?: string
  species?: string
}) {
  return useQuery<ApiListResponse<Character>, ApiError>({
    queryKey: ['characters', params],
    queryFn: () => characterApi.list(params),
    placeholderData: keepPreviousData,
    staleTime: 30_000
  })
}