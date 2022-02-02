import React from "react"
import { generateNextPossiblePositions } from "../helpers"

export const Tile = ({
  coordinate,
  tileColour,
  gameStatus,
  handleNewPosition,
}) => {
  const isCurrentPosition = () =>
    JSON.stringify(gameStatus.knightPosition) === JSON.stringify(coordinate)
  
  const isTargetPosition = () =>
    JSON.stringify(gameStatus.targetPosition) === JSON.stringify(coordinate)
  
  const isNextPossiblePosition = () =>
    generateNextPossiblePositions(gameStatus.knightPosition)
      .map(
        (possiblePosition) => `${possiblePosition[0]}-${possiblePosition[1]}`
      )
      .includes(`${coordinate[0]}-${coordinate[1]}`)

  const defineClassName = () => {
    // This function defines the tiles that must have the knight, target and next possible moves.
    if (isCurrentPosition()) {
      return "tile-knight"
    } else if (isNextPossiblePosition() && isTargetPosition()) {
      return "tile-target-possible-position"
    } else if (isTargetPosition()) {
      return "tile-target"
    } else if (isNextPossiblePosition()) {
      return "new-possible-position"
    } else return "tile"
  }

  return (
    <div
      onClick={(e) => handleNewPosition(e, coordinate)}
      className={defineClassName()}
      id={`${coordinate[0]}-${coordinate[1]}`}
      style={{ backgroundColor: tileColour }}
    ></div>
  )
}
