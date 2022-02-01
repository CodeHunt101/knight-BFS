export const generateCoordinates = () => {
  // Returns the coordinates of the Chess board
  const xCoordinates = [1, 2, 3, 4, 5, 6, 7, 8]
  const yCoordinates = [8, 7, 6, 5, 4, 3, 2, 1]

  const allCoordinates = []

  xCoordinates.forEach((x) => {
    yCoordinates.forEach((y) => {
      allCoordinates.push([x, y])
    })
  })
  return allCoordinates
}

export const generateRandomCoordinate = () =>
  // Returns a random coordinate form the chess table
  generateCoordinates()[
    Math.floor(Math.random() * generateCoordinates().length)
  ]

export const newPossiblePositions = (currentPosition) => {
  // Return new possible positions of a Knight in a chess game
  const [maxXCoordinate, maxYCoordinate, minXCoordinate, minYCoordinate] = [
    8, 8, 1, 1,
  ]

  //Possible positions without filtering impossible coordinates
  let possiblePosition1 = [currentPosition[0] + 1, currentPosition[1] + 2]
  let possiblePosition2 = [currentPosition[0] + 1, currentPosition[1] - 2]
  let possiblePosition3 = [currentPosition[0] - 1, currentPosition[1] + 2]
  let possiblePosition4 = [currentPosition[0] - 1, currentPosition[1] - 2]
  let possiblePosition5 = [currentPosition[0] + 2, currentPosition[1] + 1]
  let possiblePosition6 = [currentPosition[0] + 2, currentPosition[1] - 1]
  let possiblePosition7 = [currentPosition[0] - 2, currentPosition[1] + 1]
  let possiblePosition8 = [currentPosition[0] - 2, currentPosition[1] - 1]

  const possiblePositions = [
    possiblePosition1,
    possiblePosition2,
    possiblePosition3,
    possiblePosition4,
    possiblePosition5,
    possiblePosition6,
    possiblePosition7,
    possiblePosition8,
  ]

  // Filter to show only valid positions
  return possiblePositions
    .filter((possiblePosition) => {
      return (
        possiblePosition[0] <= maxXCoordinate &&
        possiblePosition[0] >= minXCoordinate &&
        possiblePosition[1] <= maxYCoordinate &&
        possiblePosition[1] >= minYCoordinate
      )
    })
    .map((possiblePosition) => `${possiblePosition[0]}-${possiblePosition[1]}`)
}
