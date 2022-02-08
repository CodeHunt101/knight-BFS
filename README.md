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

## Structure (MVC)

### Models & Controllers
The *Rails* server handles the entire logic of game from the **Game** model (*Game.rb*). The information is sent to the Client from  **Api::V1::GamesController** (*games_controller.rb*) as JSON. The manual play mode is handled from the client.

### Views
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

## Recent major implementations
- Help button calls a *Breadth First Search* algorithm to find the shortest path to the final target location.

## Improvement Opportunities
- Add a Rails backend for more features such as, data persistance, and user login.
- Add more stylings and improve responsiveness.
- Further code refactoring.
- Add tests to minimise bug occurrences.

Thank you for your time!