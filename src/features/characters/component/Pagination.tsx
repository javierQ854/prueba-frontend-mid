interface Props {
  page: number
  hasPrev: boolean
  hasNext: boolean
  onPrev: () => void
  onNext: () => void
}

export function Pagination({
  page,
  hasPrev,
  hasNext,
  onPrev,
  onNext
}: Props) {
  return (
    <div className="flex items-center justify-center space-x-4 mt-6">
      <button
        onClick={onPrev}
        disabled={!hasPrev}
        className={`
          px-4 py-2 rounded-full font-medium transition-colors duration-200 cursor-pointer
          ${hasPrev ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
        `}
      >
        Back
      </button>

      <span className="font-semibold text-gray-700">Página {page}</span>

      <button
        onClick={onNext}
        disabled={!hasNext}
        className={`
          px-4 py-2 rounded-full font-medium transition-colors duration-200 cursor-pointer
          ${hasNext ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
        `}
      >
        Next
      </button>
    </div>
  )
}