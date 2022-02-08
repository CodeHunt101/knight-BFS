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

