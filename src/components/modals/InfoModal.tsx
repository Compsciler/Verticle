import { Grid } from '../grid/Grid'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="How to play" isOpen={isOpen} handleClose={handleClose} isWide={true}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Vertically guess the word in 6 tries. After each guess, the color of the tiles will
        change to show how close your guess was to 
        the letter <strong>in that column position</strong> for the word.
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Imagine the solution word being placed in the bottom row and 
        the color of the letters in the grid apply to the word below.
        (If you reach the 6th guess, it will be spelled horizontally and will be colored normally.)
      </p>

      <div className="flex justify-center mb-1 mt-4">
        {/* <CompletedCol solution="" guess="WEARY" col={1} /> */}
        <Grid
          solution="AMPLY"
          guesses={["WEARY", "PILLS", "VAGUE", "AMPLY"]}
          currentGuess=""
          isRevealing={false}
          isStartOfRevealing={false}
          currentRowClassName=""
        />
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-300">
        Information gained from guesses:
        <br /><br />
        <ol>
          <li>
            <b>1.</b> The letter A is in the word and in the 1st position. {<br />}
            The letter Y is in the word but not in the 1st position.
          </li>
          <li>
            <b>2.</b> The letter P is in the word but not in the 2nd position. {<br />}
            There letter L appears exactly once in the word but not in the 2nd position.
          </li>
          <li>
            <b>3.</b> The letter A is in the word but not in the 3rd position. {<br />}
            (This A would be green if and only if another A was in the 3rd position.)
          </li>
          <li>
            <b>4.</b> The guess was correct and the word was AMPLY! {<br />}
            (Make sure you understand why APPLY cannot be the solution.)
          </li>
          <br />
          All gray letters are not in the word in any position.
        </ol>
      </p>
      <br />
      <p className="text-sm text-gray-500 dark:text-gray-300">
        In the future, you may have the option to select the order in which you place words in each column.
      </p>
      <p className="mt-2 italic text-sm text-gray-500 dark:text-gray-300">
        This is an open source version of the word guessing game we all know and
        love -{' '}
        <a
          href="https://github.com/Compsciler/Verticle/"
          className="underline font-bold"
        >
          check out the code here
        </a>{' '}
      </p>
    </BaseModal>
  )
}
