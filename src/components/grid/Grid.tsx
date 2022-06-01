import { randomBytes } from 'crypto'
import { Dispatch, SetStateAction } from 'react'
import { MAX_CHALLENGES } from '../../constants/settings'
import { CharStatus } from '../../lib/statuses'
import { CompletedCol } from './CompletedCol'
import { CompletedRow } from './CompletedRow'
import { CurrentCol } from './CurrentCol'
import { CurrentRow } from './CurrentRow'
import { EmptyCol } from './EmptyCol'
import { EmptyRow } from './EmptyRow'

type Props = {
  solution: string
  guesses: string[]
  currentGuess: string
  isRevealing?: boolean
  isStartOfRevealing: boolean
  setIsStartOfRevealing: Dispatch<SetStateAction<boolean>>
  currentRowClassName: string
  charStatuses: {[key: string]: CharStatus}
  setCharStatuses: Dispatch<SetStateAction<{[key: string]: CharStatus}>>
}

export const Grid = ({
  solution,
  guesses,
  currentGuess,
  isRevealing,
  isStartOfRevealing,
  setIsStartOfRevealing,
  currentRowClassName,
  charStatuses,
  setCharStatuses,
}: Props) => {
  const empties =
    guesses.length < MAX_CHALLENGES - 1
      ? Array.from(Array(MAX_CHALLENGES - 1 - guesses.length))
      : []

  const styles = {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'stretch',
    height: '400px',
    width: `${solution.length * 60}px`,
  }
  const lineBreakStyle = {
    width: '100%'
  }
  return (
    <div style={styles}>
      {guesses.slice(0, solution.length).map((guess, i) => (
        <CompletedCol
          key={i}
          solution={solution}
          guess={guess}
          isRevealing={isRevealing && guesses.length - 1 === i}
          col={i}
        />
      ))}
      {guesses.slice(solution.length, MAX_CHALLENGES).map((guess, i) => (
        <>
          <div style={lineBreakStyle}></div>
          {/* {i == 0 && <div style={lineBreakStyle}></div>} */}
          <CompletedRow
            key={solution.length + i}
            solution={solution}
            guess={guess}
            isRevealing={isRevealing && guesses.length - 1 === solution.length + i}
          />
        </>
      ))}
      {guesses.length < MAX_CHALLENGES && guesses.length < solution.length && (
        <CurrentCol
          guess={currentGuess}
          solution={solution}
          className={currentRowClassName} 
          isStartOfRevealing={isStartOfRevealing}
          setIsStartOfRevealing={setIsStartOfRevealing}
          col={guesses.length}
          charStatuses={charStatuses}
          setCharStatuses={setCharStatuses}
        />
      )}
      {guesses.length < MAX_CHALLENGES && guesses.length >= solution.length && (
        <>
          <div style={lineBreakStyle}></div>
          <CurrentRow
            guess={currentGuess}
            solution={solution}
            className={currentRowClassName}
            isStartOfRevealing={isStartOfRevealing}
            setIsStartOfRevealing={setIsStartOfRevealing}
            charStatuses={charStatuses}
            setCharStatuses={setCharStatuses}
          />
        </>
      )}
      
      {/* Assumes that solution.length < MAX_CHALLENGES */}
      {empties.slice(0, solution.length - MAX_CHALLENGES).map((_, i) => (
        <EmptyCol solution={solution} key={i} />
      ))}
      {empties.slice(solution.length - MAX_CHALLENGES, empties.length).map((_, i) => (
        <>
          <div style={lineBreakStyle}></div>
          <EmptyRow solution={solution} key={solution.length + i} />
        </>
      ))}
    </div>
  )
}
