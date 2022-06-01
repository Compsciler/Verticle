import { Dispatch, SetStateAction } from 'react'
import { unicodeSplit } from './words'

export type CharStatus = 'absent' | 'present' | 'correct'

export const getStatuses = (
  solution: string,
  guesses: string[]
): { [key: string]: CharStatus } => {
  const charObj: { [key: string]: CharStatus } = {}
  const splitSolution = unicodeSplit(solution)

  guesses.forEach((word) => {
    unicodeSplit(word).forEach((letter, i) => {
      if (!splitSolution.includes(letter)) {
        // make status absent
        return (charObj[letter] = 'absent')
      }

      if (letter === splitSolution[i]) {
        //make status correct
        return (charObj[letter] = 'correct')
      }

      if (charObj[letter] !== 'correct') {
        //make status present
        return (charObj[letter] = 'present')
      }
    })
  })
  
  return charObj
}

export const setStatuses = (
  guess: string,
  newGuessStatuses: CharStatus[],
  charStatuses: {[key: string]: CharStatus},
  setCharStatuses: Dispatch<SetStateAction<{[key: string]: CharStatus}>>
) => {
  let newCharStatuses = {...charStatuses}  // Copy map?
  unicodeSplit(guess).forEach((char, i) => {
    const newGuessStatus = newGuessStatuses[i]
    
    if (newGuessStatus === 'correct') {
      newCharStatuses = {
        ...newCharStatuses,
        [char]: 'correct'
      }
    } else if (newGuessStatus === 'present') {
      if (newCharStatuses[char] !== 'correct') {
        newCharStatuses = {
          ...newCharStatuses,
          [char]: 'present'
        }
      }
    } else if (newGuessStatus === 'absent') {
      if (newCharStatuses[char] !== 'correct' && newCharStatuses[char] !== 'present') {
        newCharStatuses = {
          ...newCharStatuses,
          [char]: 'absent'
        }
      }
    }
  })
  setCharStatuses(newCharStatuses)
}

export const getRowGuessStatuses = (
  solution: string,
  guess: string
): CharStatus[] => {
  const splitSolution = unicodeSplit(solution)
  const splitGuess = unicodeSplit(guess)

  const solutionCharsTaken = splitSolution.map((_) => false)

  const statuses: CharStatus[] = Array.from(Array(guess.length))

  // handle all correct cases first
  splitGuess.forEach((letter, i) => {
    if (letter === splitSolution[i]) {
      statuses[i] = 'correct'
      solutionCharsTaken[i] = true
      return
    }
  })

  splitGuess.forEach((letter, i) => {
    if (statuses[i]) return

    if (!splitSolution.includes(letter)) {
      // handles the absent case
      statuses[i] = 'absent'
      return
    }

    // now we are left with "present"s
    const indexOfPresentChar = splitSolution.findIndex(
      (x, index) => x === letter && !solutionCharsTaken[index]
    )

    if (indexOfPresentChar > -1) {
      statuses[i] = 'present'
      solutionCharsTaken[indexOfPresentChar] = true
      return
    } else {
      statuses[i] = 'absent'
      return
    }
  })
  
  return statuses
}

export const getColGuessStatuses = (
  solution: string,
  guess: string,
  colIndex: number
): CharStatus[] => {
  const splitSolution = unicodeSplit(solution)
  const splitGuess = unicodeSplit(guess)

  const solutionCharsTaken = splitSolution.map((_) => false)

  const statuses: CharStatus[] = Array.from(Array(guess.length))

  // handle all correct cases first
  let found_correct_letter = false
  splitGuess.forEach((letter, i) => {
    if (letter === splitSolution[colIndex] && !found_correct_letter) {
      statuses[i] = 'correct'
      solutionCharsTaken[colIndex] = true
      found_correct_letter = true
      return
    }
  })

  splitGuess.forEach((letter, i) => {
    if (statuses[i]) return

    if (!splitSolution.includes(letter)) {
      // handles the absent case
      statuses[i] = 'absent'
      return
    }

    // now we are left with "present"s
    const indexOfPresentChar = splitSolution.findIndex(
      (x, index) => x === letter && !solutionCharsTaken[index]
    )

    if (indexOfPresentChar > -1) {
      statuses[i] = 'present'
      solutionCharsTaken[indexOfPresentChar] = true
      return
    } else {
      statuses[i] = 'absent'
      return
    }
  })
  
  return statuses
}
