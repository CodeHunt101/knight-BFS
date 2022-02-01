import React from "react"

export const Box = ({ coordinate, boxColour, newGame }) => {
  const defineClassName = () => {
    if (newGame.knightPosition === coordinate) {
      return "box-knight"
    } else if (newGame.targetPosition === coordinate) {
      return "box-target"
    } else return "box"
  }

  return (
    <div
      className={defineClassName()}
      id={coordinate}
      style={{ backgroundColor: boxColour }}
    ></div>
  )
}
