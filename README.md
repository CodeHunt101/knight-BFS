# Knight Chess Game coding challenge

## Instructions

1. Clone this repository.

2. To install all the dependencies, please run:
```
npm install
```

3. Run the following to start the server:
```
npm start
```

## Structure

The components structure is the following:

```
App.js
  |
  |-->GameControl.js
          |
          |-->ChessBoard.js
                  |
                  |-->Tile.js
```

*index.css* contains the stylings and layout

There is a file called *helpers.js*, which contains some exported functions to some components.

## Improvement Opportunities

- Add more stylings and improve responsiveness.
- The logic to get to the ending location by clicking on the *Help* function could be more optimal. E.g. Minimising the steps.
- Further code refactoring.
- Add tests to minimise bug occurrences.

Thank you for your time!