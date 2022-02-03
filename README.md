# Knight Chess Game coding challenge

## Instructions

1. Clone this repository.

2. Please make sure you are using **Ruby 2.7.4**, otherwise go to *Gemfile* and change the ruby version to the one you currently have. Then please run:

```
bundle install
```

3. To install all the react dependencies, please run:
```
npm install --prefix client
```

4. To call the server run:

```
rails server
```

5. Run the following to start the game in the browser:
```
npm start --prefix client
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

- Add a Rails backend for more features like data persistance, user login, and the logic itself.
- Add more stylings and improve responsiveness.
- The logic to get to the ending location by clicking on the *Help* function could be more optimal. E.g. Minimising the steps.
- Further code refactoring.
- Add tests to minimise bug occurrences.

Thank you for your time!