import React from "react"
import { useState, useEffect } from "react"
import { ChessBoard } from "./ChessBoard"
import { generateCoordinates } from "../helpers"
import { generateNextPossiblePositions } from "../helpers"
import { findNextBestPosition } from "../helpers"

export const GameControl = () => {
  const [gameStatus, setGameStatus] = useState({
    knightPosition: "",
    targetPosition: "",
    prevMoves: [],
  })

  const startNewGame = () => (
    fetch('/api/v1/new_game')
      .then(resp => resp.json())
      .then(resp => setGameStatus({
        knightPosition: resp.resp.knight_position,
        targetPosition: resp.resp.target_psition,
        prevMoves:[resp.resp.knight_position]
      }))
  )

  const handleNewPosition = (event, coordinate) => {
    ;["new-possible-position", "tile-target-possible-position"].includes(event.target.className) &&
      setGameStatus({
        ...gameStatus,
        knightPosition: coordinate,
        prevMoves: [],
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
