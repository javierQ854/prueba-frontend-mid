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
    <div className="flex justify-between">
      <button disabled={!hasPrev} onClick={onPrev}>
        Back
      </button>

      <span>Página {page}</span>

      <button disabled={!hasNext} onClick={onNext}>
        Next
      </button>
    </div>
  )
}