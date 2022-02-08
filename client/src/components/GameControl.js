import React from "react"
import { useState, useEffect } from "react"
import { ChessBoard } from "./ChessBoard"

export const GameControl = () => {
  const [gameStatus, setGameStatus] = useState({
    knightPosition: "",
    targetPosition: "",
    disableHelpButton: false,
  })

  const startNewGame = () =>
    fetch("/api/v1/new_game")
      .then((resp) => resp.json())
      .then((resp) =>
        setGameStatus({
          ...gameStatus,
          knightPosition: resp.initial_and_target_positions.knight_position,
          targetPosition: resp.initial_and_target_positions.target_position,
        })
      )

  const handleNewPosition = (event, coordinate) => {
    ;["new-possible-position", "tile-target-possible-position"].includes(
      event.target.className
    ) &&
      setGameStatus({
        ...gameStatus,
        knightPosition: coordinate,
      })
  }

  const helpUser = (e) => {
    // Sends a POST request with initial location and target params to the backend, which handles and retrieves
    // the shortest path. Each step is displayed every 1 second.

    if (gameStatus.knightPosition !== "") {
      fetch("/api/v1/shortest_path", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          game: {
            initial_position: gameStatus.knightPosition,
            target_position: gameStatus.targetPosition,
          },
        }),
      })
        .then((resp) => resp.json())
        .then((resp) => {
          for (let i = 0; i < resp.shortest_path.length; i++) {
            setTimeout(() => {
              setGameStatus({
                ...gameStatus,
                knightPosition: resp.shortest_path[i],
                disableHelpButton: true,
              })
            }, 1000 * i)
          }
        })
    } else {
      alert("Please start a new game first")
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
        disableHelpButton: false,
      })
      alert("Contratulations! You reached the final target")
    }
  }, [gameStatus.knightPosition, gameStatus.targetPosition])

  return (
    <>
      <ChessBoard
        gameStatus={gameStatus}
        handleNewPosition={handleNewPosition}
      />
      <div id="control">
        <button onClick={startNewGame} className="control-button" id="new-game">
          Start new game
        </button>
        <button
          onClick={helpUser}
          disabled={gameStatus.disableHelpButton}
          className="control-button"
          id="help"
        >
          Help
        </button>
      </div>
    </>
  )
}
