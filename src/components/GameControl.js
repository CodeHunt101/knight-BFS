import React from "react"
import { useState, useEffect } from "react"
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

  const handleNewPosition = (event, coordinate) => {
    ;["new-possible-position", "box-target"].includes(event.target.className) &&
      setNewGame({ ...newGame, knightPosition: coordinate })
  }

  useEffect(() => {
    // Back to initial state when the knight reaches the target
    if (
      JSON.stringify(newGame.knightPosition) ===
        JSON.stringify(newGame.targetPosition) &&
      newGame.knightPosition !== ""
    ) {
      alert("Contratulations! You reached the final target")
      setNewGame({
        knightPosition: "",
        targetPosition: "",
      })
    }
  }, [newGame.knightPosition, newGame.targetPosition])

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
    return { knightPosition, targetPosition }
  }

  return (
    <>
      <ChessBoard
        generateCoordinates={generateCoordinates}
        newGame={newGame}
        handleNewPosition={handleNewPosition}
      />
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
