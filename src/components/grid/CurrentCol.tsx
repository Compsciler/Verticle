import { Cell } from './Cell'
import { unicodeSplit } from '../../lib/words'
import { Dispatch, SetStateAction } from 'react'
import { CharStatus, getColGuessStatuses, setStatuses } from '../../lib/statuses'

type Props = {
  guess: string
  solution: string
  className: string
  isStartOfRevealing: boolean,
  setIsStartOfRevealing?: Dispatch<SetStateAction<boolean>>
  col: number
  charStatuses?: {[key: string]: CharStatus}
  setCharStatuses?: Dispatch<SetStateAction<{[key: string]: CharStatus}>>
}

export const CurrentCol = ({ guess, solution, className, isStartOfRevealing, setIsStartOfRevealing, col, charStatuses, setCharStatuses }: Props) => {
  const statuses = getColGuessStatuses(solution, guess, col)
  if (isStartOfRevealing && setIsStartOfRevealing) {
    setIsStartOfRevealing(false)
    if (charStatuses && setCharStatuses) {
      setStatuses(guess, statuses, charStatuses, setCharStatuses)
    }
  }
  const splitGuess = unicodeSplit(guess)
  const emptyCells = Array.from(Array(solution.length - splitGuess.length))
  const classes = `${className}`

  return (
    <div className={classes}>
      {splitGuess.map((letter, i) => (
        <>
          <Cell key={i} value={letter} />
          <div className="mb-1"></div>
        </>
      ))}
      {emptyCells.map((_, i) => (
        <>
          <Cell key={i} />
          <div className="mb-1"></div>
        </>
      ))}
    </div>
  )
}
