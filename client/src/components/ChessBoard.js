import React from "react"
import { Tile } from "./Tile"

export const ChessBoard = ({
  generateCoordinates,
  gameStatus,
  handleNewPosition,
}) => {
  const renderTiles = () =>
    // Renders all the tiles of the chess board and defines the colours.
    generateCoordinates().map((coordinate) => (
      <Tile
        key={coordinate}
        coordinate={coordinate}
        gameStatus={gameStatus}
        handleNewPosition={handleNewPosition}
        tileColour={defineTileColour(coordinate)}
      />
    ))

  const defineTileColour = (coordinate) => {
    // If the both y and x coordinates are odd or both are even, the tile will be black, otherwise white
    if (
      (coordinate[1] % 2 !== 0 && coordinate[0] % 2 !== 0) ||
      (coordinate[1] % 2 === 0 && coordinate[0] % 2 === 0)
    ) {
      return "black"
    } else return "white"
  }

  return <div id="chessboard">{renderTiles()}</div>
}
