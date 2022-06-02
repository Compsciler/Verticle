import { WORDS } from '../constants/wordlist'
import { VALID_GUESSES } from '../constants/validGuesses'
import { WRONG_SPOT_MESSAGE, NOT_CONTAINED_MESSAGE } from '../constants/strings'
import { getColGuessStatuses } from './statuses'
import { default as GraphemeSplitter } from 'grapheme-splitter'

export const isWordInWordList = (word: string) => {
  return (
    VALID_GUESSES.includes(localeAwareLowerCase(word))
  )
}

export const isWinningWord = (word: string, solution: string) => {
  return word === solution
}

export const isWinningWordOfDay = (word: string) => {
  return isWinningWord(word, solution)
}

// build a set of previously revealed letters - present and correct
// guess must use correct letters in that space and any other revealed letters
// also check if all revealed instances of a letter are used (i.e. two C's)
export const findFirstUnusedReveal = (word: string, guesses: string[], solution: string) => {
  if (guesses.length === 0) {
    return false
  }

  const splitWord = unicodeSplit(word)

  // Assumes that solution.length >= MAX_CHALLENGES - 1
  const colStatusesArr = guesses.slice(0, solution.length).map((guess, i) => (
    getColGuessStatuses(solution, guess, i)
  ))

  for (let c = 0; c < colStatusesArr.length; c++) {
    const colStatuses = colStatusesArr[c]
    for (let r = 0; r < colStatuses.length; r++) {
      const status = colStatuses[r]
      const colStatusChar = unicodeSplit(guesses[c])[r]
      
      if (status === 'correct' && splitWord[c] !== colStatusChar) {
        return WRONG_SPOT_MESSAGE(colStatusChar, c + 1)
      }
    }
  }

  for (let c = 0; c < colStatusesArr.length; c++) {
    const colStatuses = colStatusesArr[c]
    const lettersLeftArray = new Array<string>()
    for (let r = 0; r < colStatuses.length; r++) {
      const status = colStatuses[r]
      const colStatusChar = unicodeSplit(guesses[c])[r]
      if (status === 'correct' || status === 'present') {
        lettersLeftArray.push(colStatusChar)
      }
    }
    
    let n
    for (const letter of splitWord) {
      n = lettersLeftArray.indexOf(letter)
      if (n !== -1) {
        lettersLeftArray.splice(n, 1)
      }
    }

    if (lettersLeftArray.length > 0) {
      return NOT_CONTAINED_MESSAGE(lettersLeftArray[0])
    }
  }
  
  return false
}

export const unicodeSplit = (word: string) => {
  return new GraphemeSplitter().splitGraphemes(word)
}

export const unicodeLength = (word: string) => {
  return unicodeSplit(word).length
}

export const localeAwareLowerCase = (text: string) => {
  return process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleLowerCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toLowerCase()
}

export const localeAwareUpperCase = (text: string) => {
  return process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleUpperCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toUpperCase()
}

export const getWordBySolutionIndex = (solutionIndex: number) => {
  if (solutionIndex < 0 || solutionIndex >= WORDS.length) {
    return {
      solution: '',
      solutionIndex: -1
    }
  }
  return {
    solution: localeAwareUpperCase(WORDS[solutionIndex]),
    solutionIndex: solutionIndex,
  }
}

export const getWordOfDay = () => {
  // January 1, 2022 Game Epoch
  const epoch = new Date(2022, 0)
  const start = new Date(epoch)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  let index = 0
  while (start < today) {
    index++
    start.setDate(start.getDate() + 1)
  }

  const nextDay = new Date(today)
  nextDay.setDate(today.getDate() + 1)

  const solutionAndIndex = getWordBySolutionIndex(index % WORDS.length)

  return {
    solution: solutionAndIndex.solution,
    solutionIndex: solutionAndIndex.solutionIndex,
    tomorrow: nextDay.valueOf(),
  }
}

export const { solution, solutionIndex, tomorrow } = getWordOfDay()
