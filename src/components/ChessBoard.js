import React from 'react'
import { Box } from './Box'

export const ChessBoard = ({generateCoordinates, newGame}) => {
  
  const renderBoxes = () => (
    // Render all the boxes of the chess board and defines the colours.
    generateCoordinates().map(coordinate => {
      if ((coordinate[1] % 2 !==0 && ['a', 'c', 'e', 'g'].includes(coordinate[0])) ||
      (coordinate[1] % 2 === 0 && ['b', 'd', 'f', 'h'].includes(coordinate[0]))) {
        return <Box key={coordinate} coordinate={`${coordinate[0]}-${coordinate[1]}`} newGame={newGame} boxColour="black" />
      }
      else return <Box key={coordinate} coordinate={`${coordinate[0]}-${coordinate[1]}`} newGame={newGame} boxColour="white" />
    } 
  ))

  return (
    <div id='chessboard'>
      {renderBoxes()}
    </div>
  )
}