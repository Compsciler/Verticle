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
          {/*
          <div className="flex justify-center mb-1">
            Look into this: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Aligning_Items_in_a_Flex_Container
          </div>
          */}
        </>
      ))}
    </div>
  )
}
