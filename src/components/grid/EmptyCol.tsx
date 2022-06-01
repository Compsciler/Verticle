import { Cell } from './Cell'

type Props = {
  solution: string
}

export const EmptyCol = ({ solution }: Props) => {
  const emptyCells = Array.from(Array(solution.length))

  return (
    <div className="" style={{alignSelf: 'stretch'}}>
      {emptyCells.map((_, i) => (
        <>
          <Cell key={i} />
          <div className="mb-1"></div>
        </>
      ))}
    </div>
  )
}
