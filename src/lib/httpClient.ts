export class ApiError extends Error {
  public status: number
  public data?: unknown

  constructor(status: number, data?: unknown) {
    super(typeof data === 'string' ? data : `HTTP ${status}`)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

const BASE_URL = import.meta.env.VITE_API_BASE

async function request<T>(
  endpoint: string,
  params?: Record<string, string | number | undefined>
): Promise<T> {
  const url = new URL(endpoint, BASE_URL)

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '')
        url.searchParams.set(key, String(value))
    })
  }

  const response = await fetch(url.toString())

  if (!response.ok) {
    let data
    try {
      data = await response.json()
    } catch {}
    throw new ApiError(response.status, data)
  }

  return response.json() as Promise<T>
}

export const httpClient = {
  get: request
}