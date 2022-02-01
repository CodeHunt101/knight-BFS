import React from "react"
import { useState, useEffect } from "react"
import { ChessBoard } from "./ChessBoard"
import { generateCoordinates } from "../helpers"
import { generateRandomCoordinate } from "../helpers"
import { generateNextPossiblePositions } from "../helpers"
import { findNextBestPosition } from "../helpers"

export const GameControl = () => {
  const [gameStatus, setGameStatus] = useState({
    knightPosition: "",
    targetPosition: "",
    prevMoves: [],
  })

  const startNewGame = () => {
    // Assigns the initial position and target to the state
    setGameStatus(defineInitialPositionAndTarget())
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
    return { knightPosition, targetPosition, prevMoves: [knightPosition] }
  }

  const handleNewPosition = (event, coordinate) => {
    ;["new-possible-position", "box-target"].includes(event.target.className) &&
      setGameStatus({
        ...gameStatus,
        knightPosition: coordinate,
        prevMoves: [...gameStatus.prevMoves, coordinate],
      })
  }

  const helpUser = () => {
    // Makes a move for the user by finding the closest position from the target
    if (gameStatus.knightPosition !== "") {
      const nextPossiblePositions = generateNextPossiblePositions(
        gameStatus.knightPosition
      )
      const nextBestPosition = findNextBestPosition(
        nextPossiblePositions,
        gameStatus.targetPosition,
        gameStatus.prevMoves
      )
      setGameStatus({
        ...gameStatus,
        knightPosition: nextBestPosition,
        prevMoves: [...gameStatus.prevMoves, nextBestPosition],
      })
    } else {
      alert('Please start a new game first')
    }
  }

  useEffect(() => {
    // Back to initial state when the knight reaches the target
    if (
      JSON.stringify(gameStatus.knightPosition) ===
        JSON.stringify(gameStatus.targetPosition) &&
      gameStatus.knightPosition !== ""
    ) {
      setGameStatus({
        knightPosition: "",
        targetPosition: "",
        prevMoves: [],
      })
      alert("Contratulations! You reached the final target")
    }
  }, [gameStatus.knightPosition, gameStatus.targetPosition])

  return (
    <>
      <ChessBoard
        gameStatus={gameStatus}
        generateCoordinates={generateCoordinates}
        handleNewPosition={handleNewPosition}
      />
      <div id="control">
        <button onClick={startNewGame} className="control-button" id="new-game">
          Start new game
        </button>
        <button onClick={helpUser} className="control-button" id="help">
          Help
        </button>
      </div>
    </>
  )
}
