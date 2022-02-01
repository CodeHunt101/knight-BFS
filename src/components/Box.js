import React from "react"
import { newPossiblePositions } from "../helpers"

export const Box = ({ coordinate, boxColour, newGame, handleNewPosition }) => {
  const defineClassName = () => {
    if (JSON.stringify(newGame.knightPosition) === JSON.stringify(coordinate)) {
      return "box-knight"
    } else if (
      JSON.stringify(newGame.targetPosition) === JSON.stringify(coordinate)
    ) {
      return "box-target"
    } else if (
      newPossiblePositions(newGame.knightPosition).includes(
        `${coordinate[0]}-${coordinate[1]}`
      )
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
