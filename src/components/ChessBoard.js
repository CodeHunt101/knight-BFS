import React from "react"
import { Box } from "./Box"

export const ChessBoard = ({
  generateCoordinates,
  newGame,
  handleNewPosition,
}) => {
  const renderBoxes = () =>
    // Render all the boxes of the chess board and defines the colours.
    generateCoordinates().map((coordinate) => (
      <Box
        key={coordinate}
        coordinate={coordinate}
        newGame={newGame}
        handleNewPosition={handleNewPosition}
        boxColour={defineBoxColour(coordinate)}
      />
    ))

  const defineBoxColour = (coordinate) => {
    if (
      (coordinate[1] % 2 !== 0 && coordinate[0] % 2 !== 0) ||
      (coordinate[1] % 2 === 0 && coordinate[0] % 2 === 0)
    ) {
      return "black"
    } else return "white"
  }

  return <div id="chessboard">{renderBoxes()}</div>
}
