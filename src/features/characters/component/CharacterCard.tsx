import type { Character } from '../Types'

interface Props {
  character: Character
  onClick: (id: number) => void
}

export function CharacterCard({ character, onClick }: Props) {
  return (
    <div className="w-64 bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:-translate-y-2 hover:rotate-1 hover:shadow-2xl cursor-pointer">
      <img 
        src={character.image} 
        alt={character.name} 
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <p className="font-bold text-lg mb-1">{character.name}</p>
        <p className="text-gray-600 text-sm">{character.status}</p>
        <p className="text-gray-600 text-sm mb-3">{character.species}</p>
        <button
          className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors duration-200"
          onClick={() => onClick(character.id)}
        >
          Ver detalle
        </button>
      </div>
    </div>
  )
}