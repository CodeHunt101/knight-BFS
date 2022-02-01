import React from "react"
import { generateNextPossiblePositions } from "../helpers"

export const Box = ({
  coordinate,
  boxColour,
  gameStatus,
  handleNewPosition,
}) => {
  const defineClassName = () => {
    // This function defines the boxes that must have the knight, target and next possible moves.
    if (
      JSON.stringify(gameStatus.knightPosition) === JSON.stringify(coordinate)
    ) {
      return "box-knight"
    } else if (
      JSON.stringify(gameStatus.targetPosition) === JSON.stringify(coordinate)
    ) {
      return "box-target"
    } else if (
      generateNextPossiblePositions(gameStatus.knightPosition)
        .map(
          (possiblePosition) => `${possiblePosition[0]}-${possiblePosition[1]}`
        )
        .includes(`${coordinate[0]}-${coordinate[1]}`)
    ) {
      return "new-possible-position"
    } else return "box"
  }

  return (
    <div
      onClick={(e) => handleNewPosition(e, coordinate)}
      className={defineClassName()}
      id={`${coordinate[0]}-${coordinate[1]}`}
      style={{ backgroundColor: boxColour }}
    ></div>
  )
}
