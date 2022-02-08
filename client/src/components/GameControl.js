import React from "react"
import { useState, useEffect } from "react"
import { ChessBoard } from "./ChessBoard"

// Initial state
const gameStatusInitial = {
  knightPosition: "",
  nextPossiblePositions: "",
  targetPosition: "",
  disableHelpButton: true,
  disableStartButton: false,
  isGameFinished: false,
}

export const GameControl = () => {
  const [gameStatus, setGameStatus] = useState(gameStatusInitial)

  const startNewGame = () => {
    /* Sends a GET request to retrieve a random knight and target positions from the server 
    and updates state accordingly */
    fetch("/api/v1/new_game")
      .then((resp) => resp.json())
      .then((resp) =>
        setGameStatus({
          ...gameStatus,
          knightPosition: resp.initial_and_target_positions.knight_position,
          nextPossiblePositions: resp.next_possible_positions,
          targetPosition: resp.initial_and_target_positions.target_position,
          disableHelpButton: false,
          isGameFinished: false,
        })
      )
  }
  const handleNewPosition = (event, coordinate) => {
    /* If tile is a possible new position and game hasn't finished, send a POST request with the current 
    position of knight as params to retrieve new possible positions and updates state accordingly */
    if (
      !gameStatus.isGameFinished &&
      ["new-possible-position", "tile-target-possible-position"].includes(
        event.target.className
      )
    ) {
      fetch("/api/v1/next_possible_positions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          game: {
            current_position: coordinate,
          },
        }),
      })
        .then((resp) => resp.json())
        .then((resp) => {
          setGameStatus({
            ...gameStatus,
            knightPosition: coordinate,
            nextPossiblePositions: resp.next_possible_positions,
          })
        })
    }
  }

  const helpUser = () => {
    /* Sends a POST request with initial location and target params to the backend, which handles and retrieves
    the shortest path. Each step is displayed every 1 second. */

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
              nextPossiblePositions: "",
              disableHelpButton: true,
              disableStartButton: true,
            })
          }, 1000 * i)
        }
      })
  }

  useEffect(() => {
    // Finish the game when knight reaches by updating state accordingly
    if (
      JSON.stringify(gameStatus.knightPosition) ===
        JSON.stringify(gameStatus.targetPosition) &&
      gameStatus.knightPosition !== ""
    ) {
      setGameStatus({
        ...gameStatus,
        isGameFinished: true,
        disableHelpButton: true,
        disableStartButton: false,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    gameStatus.knightPosition,
    gameStatus.targetPosition,
    gameStatus.isGameFinished,
  ])

  return (
    <>
      <ChessBoard
        gameStatus={gameStatus}
        handleNewPosition={handleNewPosition}
      />
      <div id="control">
        <button
          onClick={startNewGame}
          disabled={gameStatus.disableStartButton}
          className="control-button"
          id="new-game"
        >
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
      {gameStatus.isGameFinished && (
        <div>
          <b>Contratulations! You reached the final target</b>
        </div>
      )}
    </>
  )
}
