export interface ApiListResponse<T> { 
  info: Info
  results: T[]
}

export interface Info {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

export type CharacterStatus = 'Alive' | 'Dead' | 'unknown'
export type Gender = 'Female' | 'Male' | 'Genderless' | 'unknown'

export interface Character {
  id: number
  name: string
  status: CharacterStatus
  species: string
  type: string
  gender: Gender
  origin: Origin
  location: Location
  image: string
  episode: string[] // URLs
  url: string
  created: string
}

export interface Origin {
  name: string
  url: string
}

export interface Location {
  name: string
  url: string
}

export interface Episode {
  id: number
  name: string
  air_date: string
  episode: string
}