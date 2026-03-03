import { httpClient } from '@/lib/httpClient'
import type { ApiListResponse, Character, Episode } from '../Types'

export const characterApi = {
  list: (params: {
    page: number
    name?: string
    species?: string
  }) =>
    httpClient.get<ApiListResponse<Character>>('/api/character', params),

  byId: (id: number) =>
    httpClient.get<Character>(`/api/character/${id}`),

  episodesByIds: async (ids: number[]) => {
    if (!ids.length) return []

    const data = await httpClient.get<Episode[] | Episode>(
      `/api/episode/${ids.join(',')}`
    )

    return Array.isArray(data) ? data : [data]
  }
}