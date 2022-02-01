import React from "react"
import { useState } from "react"
import { ChessBoard } from "./ChessBoard"
import { generateCoordinates } from "../helpers"
import { generateRandomCoordinate } from "../helpers"

export const GameControl = () => {
  const [newGame, setNewGame] = useState({
    knightPosition: "",
    targetPosition: "",
  })

  const startNewGame = () => {
    // Assigns the initial position and target to the state
    setNewGame(defineInitialPositionAndTarget())
  }

  const defineInitialPositionAndTarget = () => {
    // Defines the initial position of the Knight and the target
    let [knightPosition, targetPosition] = [
      generateRandomCoordinate(),
      generateRandomCoordinate(),
    ]
    //Makes sure the initial position and target are not the same 
    while (JSON.stringify(knightPosition) === JSON.stringify(targetPosition)) {
      ;[knightPosition, targetPosition] = [
        generateRandomCoordinate(),
        generateRandomCoordinate(),
      ]
    }
    return { knightPosition: `${knightPosition[0]}-${knightPosition[1]}`, targetPosition: `${targetPosition[0]}-${targetPosition[1]}` }
  }

  return (
    <>
      <ChessBoard generateCoordinates={generateCoordinates} newGame={newGame}/>
      <div id="control">
        <button onClick={startNewGame} className="control-button" id="new-game">
          Start new game
        </button>
        <button className="control-button" id="help">
          Help
        </button>
      </div>
    </>
  )
}
