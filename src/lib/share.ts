import { CharStatus, getColGuessStatuses, getRowGuessStatuses } from './statuses'
import { unicodeSplit } from './words'
import { GAME_TITLE } from '../constants/strings'
import { MAX_CHALLENGES } from '../constants/settings'
import { UAParser } from 'ua-parser-js'

const webShareApiDeviceTypes: string[] = ['mobile', 'smarttv', 'wearable']
const parser = new UAParser()
const browser = parser.getBrowser()
const device = parser.getDevice()
const gameUrl = 'rebrand.ly/verticle'

export const shareStatus = (
  solution: string,
  solutionIndex: number,
  guesses: string[],
  lost: boolean,
  isHardMode: boolean,
  isDarkMode: boolean,
  isHighContrastMode: boolean,
  handleShareToClipboard: () => void
) => {
  const textToShare =
    `${GAME_TITLE} ${solutionIndex} ${
      lost ? 'X' : guesses.length
    }/${MAX_CHALLENGES}${isHardMode ? '*' : ''}\n\n` +
    generateEmojiGrid(
      solution,
      guesses,
      getEmojiTiles(false, isHighContrastMode)
    ) + '\n\n' +
    gameUrl

  const shareData = { text: textToShare }

  let shareSuccess = false

  try {
    if (attemptShare(shareData)) {
      navigator.share(shareData)
      shareSuccess = true
    }
  } catch (error) {
    shareSuccess = false
  }

  if (!shareSuccess) {
    navigator.clipboard.writeText(textToShare)
    handleShareToClipboard()
  }
}

export const generateEmojiGrid = (
  solution: string,
  guesses: string[],
  tiles: string[]
) => {
  const colEmojiGridArr = new Array(solution.length)
  for (let i = 0; i < colEmojiGridArr.length; i++) {
    colEmojiGridArr[i] = new Array(solution.length)
  }
  guesses.slice(0, solution.length).forEach((guess, c) => {
    const status = getColGuessStatuses(solution, guess, c)
    const splitGuess = unicodeSplit(guess)
    splitGuess.forEach((char, r) => {
      colEmojiGridArr[r][c] = getStatusEmoji(status[r], tiles)
    })
  })
  const colEmojiGrid = colEmojiGridArr
    .map(colEmojiGridRow => (
      colEmojiGridRow.join('')
    ))
    .join('\n')

  const rowEmojiGrid = guesses.slice(solution.length, guesses.length)
    .map((guess) => {
      const status = getRowGuessStatuses(solution, guess)
      const splitGuess = unicodeSplit(guess)

      return splitGuess
        .map((_, i) => {
          return getStatusEmoji(status[i], tiles)
        })
        .join('')
    })
    .join('\n')

    let emojiGrid = colEmojiGrid
    if (rowEmojiGrid) {
      emojiGrid += '\n\n' + rowEmojiGrid
    }
    return emojiGrid
}

const getStatusEmoji = (status: CharStatus, tiles: string[]) => {
  switch (status) {
    case 'correct':
      return tiles[0]
    case 'present':
      return tiles[1]
    default:
      return tiles[2]
  }
}

const attemptShare = (shareData: object) => {
  return (
    // Deliberately exclude Firefox Mobile, because its Web Share API isn't working correctly
    browser.name?.toUpperCase().indexOf('FIREFOX') === -1 &&
    webShareApiDeviceTypes.indexOf(device.type ?? '') !== -1 &&
    navigator.canShare &&
    navigator.canShare(shareData) &&
    navigator.share
  )
}

export const getEmojiTiles = (isDarkMode: boolean, isHighContrastMode: boolean) => {
  let tiles: string[] = []
  tiles.push(isHighContrastMode ? '🟧' : '🟩')
  tiles.push(isHighContrastMode ? '🟦' : '🟨')
  tiles.push(isDarkMode ? '⬛' : '⬜')
  return tiles
}
