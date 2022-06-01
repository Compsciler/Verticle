import { Cell } from './Cell'
import { unicodeSplit } from '../../lib/words'
import { Dispatch, SetStateAction } from 'react'
import { CharStatus, getRowGuessStatuses, setStatuses } from '../../lib/statuses'

type Props = {
  guess: string
  solution: string
  className: string
  isStartOfRevealing: boolean,
  setIsStartOfRevealing?: Dispatch<SetStateAction<boolean>>
  charStatuses?: {[key: string]: CharStatus}
  setCharStatuses?: Dispatch<SetStateAction<{[key: string]: CharStatus}>>
}

export const CurrentRow = ({ guess, solution, className, isStartOfRevealing, setIsStartOfRevealing, charStatuses, setCharStatuses }: Props) => {
  const statuses = getRowGuessStatuses(solution, guess)
  if (isStartOfRevealing && setIsStartOfRevealing) {
    setIsStartOfRevealing(false)
    if (charStatuses && setCharStatuses) {
      setStatuses(guess, statuses, charStatuses, setCharStatuses)
    }
  }
  const splitGuess = unicodeSplit(guess)
  const emptyCells = Array.from(Array(solution.length - splitGuess.length))
  const classes = `flex justify-center mb-1 ${className}`

  return (
    <div className={classes}>
      {splitGuess.map((letter, i) => (
        <Cell key={i} value={letter} />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
