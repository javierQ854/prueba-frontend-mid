interface Props {
  name: string
  species: string
  onNameChange: (value: string) => void
  onSpeciesChange: (value: string) => void
}

export function FiltersBar({
  name,
  species,
  onNameChange,
  onSpeciesChange
}: Props) {
  return (
    <div className="flex gap-4">
      <input
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder="Buscar por nombre"
        className="border p-2"
      />

      <input
        value={species}
        onChange={(e) => onSpeciesChange(e.target.value)}
        placeholder="Filtrar por especie"
        className="border p-2"
      />
    </div>
  )
}