import type { IResponse, ICharacter } from "../interface/Character"

const API_URL = import.meta.env.VITE_API_URL;

export const getAllCharacters = async (): Promise<IResponse> => {
    try {
        const result = await fetch(API_URL)
        if (!result.ok) throw new Error('No se encontraron los datos')
        const res = await result.json() as IResponse
        return res
    } catch (error) {
        throw new Error('Error en el servicio')
    }

}


export const pageCharacters = async (id: number): Promise<IResponse> => {
    try {
        const result = await fetch(`${API_URL}/?page=${id}`)
        if (!result.ok) throw new Error('No se encontraron datos')
        const res = await result.json() as IResponse
        return res
    } catch (error) {
        throw new Error('Error en el servicio')
    }

}


export const searchCharacters = async (name: string, status?: string): Promise<IResponse> => {
    try {
        const result = await fetch(`${API_URL}/?name=${name}`)
        if (!result.ok) throw new Error('No se encontraron datos')
        const res = await result.json() as IResponse
        return res
    } catch (error) {
        throw new Error('Error en el servicio')
    }

}

export const searchCharacterById = async (id: number): Promise<ICharacter> => {
    try {
        const result = await fetch(`${API_URL}/${id}`)
        if (!result.ok) throw new Error('No se encontraron datos')
        const res = await result.json() as ICharacter
        return res
    }catch(error){
        throw new Error('Error en el servicio')
    }
    
}


