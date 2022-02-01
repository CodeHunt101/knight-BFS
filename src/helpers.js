export const generateCoordinates = () => {
  // Returns the coordinates of the Chess board
  const xCoordinates = ["a", "b", "c", "d", "e", "f", "g", "h"]
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