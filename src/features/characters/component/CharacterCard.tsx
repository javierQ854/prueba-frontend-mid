import type { Character } from '../Types'

interface Props {
  character: Character
  onClick: (id: number) => void
}

export function CharacterCard({ character, onClick }: Props) {
  return (
    <div className="border p-3">
      <img src={character.image} alt={character.name} />
      <p className="font-bold">{character.name}</p>
      <p>{character.status}</p>
      <p>{character.species}</p>

      <button
        className="bg-black text-white px-3 py-1 mt-2"
        onClick={() => onClick(character.id)}
      >
        Ver detalle
      </button>
    </div>
  )
}