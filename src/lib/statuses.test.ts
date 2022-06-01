import { getRowGuessStatuses } from './statuses'

const mockSolutionGetter = jest.fn()

beforeEach(() => {
  jest.mock('./words', () => ({
    ...jest.requireActual('./words'),
    get solution() {
      return mockSolutionGetter()
    },
  }))
})

describe('getGuessStatuses', () => {
  test('guess statuses', () => {
    expect(getRowGuessStatuses('ABCDE', 'EDCBA')).toEqual([
      'present',
      'present',
      'correct',
      'present',
      'present',
    ])
    expect(getRowGuessStatuses('ABCDE', 'VWXYZ')).toEqual([
      'absent',
      'absent',
      'absent',
      'absent',
      'absent',
    ])
    expect(getRowGuessStatuses('ABCDE', 'ABCDE')).toEqual([
      'correct',
      'correct',
      'correct',
      'correct',
      'correct',
    ])
  })
})
