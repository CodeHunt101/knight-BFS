import React from 'react'
import { Box } from './Box'

const generateCoordinates = () => {
  const xCoordinates = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  const yCoordinates = [1,2,3,4,5,6,7,8]

  const allCoordinates = []
  
  xCoordinates.forEach(x => {
    yCoordinates.forEach( y => {
      allCoordinates.push([x,y])
    })
  })
  return allCoordinates
}

const generateRandomCoordinate = () => generateCoordinates()[Math.floor(Math.random()*generateCoordinates().length)]

const defineInitialPositionAndTarget = () =>{
  let [knightPosition, targetPosition] = [generateRandomCoordinate(), generateRandomCoordinate()]
  while (JSON.stringify(knightPosition) === JSON.stringify(targetPosition)) {
    [knightPosition, targetPosition] = [generateRandomCoordinate(), generateRandomCoordinate()]
  }
  return {knightPosition, targetPosition}
}

export const ChessBoard = () => {
  
  const renderBoxes = () => (
    generateCoordinates().map(coordinate => {
      if ((coordinate[1] % 2 !==0 && ['a', 'c', 'e', 'g'].includes(coordinate[0])) ||
      (coordinate[1] % 2 === 0 && ['b', 'd', 'f', 'h'].includes(coordinate[0]))) {
        return <Box key={coordinate} coordinate={`${coordinate[0]}-${coordinate[1]}`} boxColour="black" />
      }
      else return <Box key={coordinate} coordinate={`${coordinate[0]}-${coordinate[1]}`} boxColour="white" />
    } 
  ))

  return (
    <div id='chessboard'>
      {renderBoxes()}
    </div>
  )
}