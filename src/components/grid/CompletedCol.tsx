import { getColGuessStatuses } from '../../lib/statuses'
import { Cell } from './Cell'
import { unicodeSplit } from '../../lib/words'

type Props = {
  solution: string
  guess: string
  isRevealing?: boolean
  col: number
}

export const CompletedCol = ({ solution, guess, isRevealing, col }: Props) => {
  const statuses = getColGuessStatuses(solution, guess, col)
  const splitGuess = unicodeSplit(guess)

  return (
    <div className="">
      {splitGuess.map((letter, i) => (
        <Cell
          key={i}
          value={letter}
          status={statuses[i]}
          position={i}
          isRevealing={isRevealing}
          isCompleted
        />
      ))}
    </div>
  )
}
