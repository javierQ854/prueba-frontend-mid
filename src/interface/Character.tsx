export interface IResponse {
    info: Iinfo,
    results: ICharacter[]
}
export interface Iinfo{
    count:number
    next:string
    pages: number
    prev: null
}

export interface ICharacter {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: Origin
  location: Location
  image: string
  episode: string[]
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