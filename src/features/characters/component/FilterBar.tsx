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
        className="w-full max-w-lg px-4 py-3 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200"
      />

      <input
        value={species}
        onChange={(e) => onSpeciesChange(e.target.value)}
        placeholder="Filtrar por especie"
        className="w-full max-w-lg px-4 py-3 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200"
      />
    </div>
  )
}