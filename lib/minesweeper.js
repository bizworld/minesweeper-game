"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* The Game class utilizes the Board class by making calls to the methods in
the Board class. */
var Game = function () {
  /* To call Board methods, we'll have to create an instance of a Board inside
  of the Game constructor. */
  function Game(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Game);

    /* instance property, this._board (the board that we will call Board methods on),
    set to an instance of Board, passing in the Game constructor's parameters
    as arguments. */
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  /* The .playMove() method includes all of the functionality needed to play a
  session of Minesweeper, i.e. flipping a tile, letting the user know if they
  discovered a bomb, and allowing a user to continue otherwise (until they win,
  or lose). */


  _createClass(Game, [{
    key: "playMove",
    value: function playMove(rowIndex, columnIndex) {
      // start by flipping a specified tile when .playMove() is called.
      this._board.flipTile(rowIndex, columnIndex);

      /* The logic that determines what should happen after a player flips a tile.
      if statement checks if the playerBoard provided by this._board has a B at
      the given row index and column index. */
      if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
        console.log("The game is over!");
        this._board.print(); // print the board
      } else if (!this._board.hasSafeTiles()) {
        //checks if there are no safe tiles on this._board.
        console.log("Congratulations, you won!");
      } else {
        console.log("Current Board: ");
        this._board.print();
      }
    }
  }]);

  return Game;
}();

/* The Board class contains all of the functionalities of creating player boards,
game boards, and printing the boards. */


var Board = function () {
  /* Add a constructor() method for the class, to be able to use the class later
  (as an object)
  The parameters represent the board size and the number of bombs on the board. */
  function Board(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Board);

    // set an instance's properties.
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns; // represents the size of the game board
    // instance property set to the value of a static method called on Board
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  /* Add a getter method, playerBoard() to the Board class, that returns or gets
  an instance's player board. */


  _createClass(Board, [{
    key: "flipTile",


    /* Add the flipTile() function to the Board class and update it to a method.
    A method that will allow the player to flip a tile and to update that tile
    accordingly. */
    value: function flipTile(rowIndex, columnIndex) {

      /* Check to see if the specified tile in this._playerBoard instance property
      (using rowIndex and columnIndex) is not empty i.e. ' ' (already been flipped).
      Also add an else if statement to check if there is a bomb, 'B' at the
      specified tile on the this._bombBoard instance property. */
      if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
        return "This tile has already been flipped!";
      } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
        // Place a bomb on the player board by checking the bomb board (else if cond.)
        this._playerBoard[rowIndex][columnIndex] = 'B';
      } else {
        /* Let the user flip the tile and then display the number of neighboring
        bombs on that same tile.
        Set the specified tile on this._playerBoard instance property, to calling
        getNumberOfNeighborBombs() method on the class instance, `this`, with
        rowIndex and columnIndex as arguments. */
        this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
      }

      /* Use the decrement operator to decrease the this._numberOfTiles instance
      property by 1. */
      this._numberOfTiles--;
    }

    /* Build one of the main pieces of Minesweeper functionality: displaying the
    number of bombs adjacent to the flipped (or clicked) tile.
    Create a method, getNumberOfNeighborBombs, that accepts parameters:
    rowIndex, columnIndex.
    This will calculate the number of bombs next to the square at the given rowIndex
    and columnIndex on the this._bombBoard. instance property. */

  }, {
    key: "getNumberOfNeighborBombs",
    value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
      var _this = this;

      var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

      var numberOfRows = this._bombBoard.length;
      var numberOfColumns = this._bombBoard[0].length;

      /* The numberOfBombs variable (initially set to 0) will be used to store the
      number of bombs adjacent to the flipped tile. It should be created with `let`
      not `const` since its value will change.
      The numberOfBombs variable should not be changed (to this._numberOfBombs)
      because it's a variable in the function, not a direct class property. */
      var numberOfBombs = 0;

      /* Call the .forEach() method on the neighborOffsets array.
      The .forEach() requires a callback method. Pass one in as an arrow function.
      The arrow function should take one parameter, offset. */
      neighborOffsets.forEach(function (offset) {
        /* Create neighborRowIndex and set to the sum of rowIndex and the first
        element of offset. */
        var neighborRowIndex = rowIndex + offset[0];

        /* Create neighborColumnIndex and set to the sum of columnIndex and the
        second element of offset. */
        var neighborColumnIndex = columnIndex + offset[1];

        /* Check if the row and column indices for neighboring tiles are valid
        (for example, we don't want to check tiles that are "off the grid" and
        don't exist). */
        if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
          /* Check if the tile at those indices (on the this._bombBoard class property)
          already contains a bomb ('B'). */
          if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
            // increment numberOfBombs counter if both of these conditions are met
            numberOfBombs++;
          }
        }
      });

      /* The purpose of this method is to return the number of bombs in an
      adjacent neighbor. */
      return numberOfBombs;
    }
  }, {
    key: "hasSafeTiles",


    /* A way to inform the user that they've won the game.
    A user wins when there are no non-bomb ("safe") tiles remaining to be flipped.
    .hasSafeTiles() method will need to check the numberOfTiles on the board
    vs. the numberOfBombs on the board. */
    value: function hasSafeTiles() {
      // no need for an if statement, since the expression it's checking is truthy
      return this._numberOfTiles !== this._numberOfBombs;
    }

    /*  A .print() method to print the formatted this._playerBoard instance
    property. */

  }, {
    key: "print",
    value: function print() {
      /* This .map() method returns an array of formatted rows. Also, chain a
      .join() method call onto your .map() method call (with '\n' as the separator)
      to join together the array of rows with new lines, placing each row on its own
      line when printed. Then wrap this line of code with console.log() in order to
      log the formatted board to the console. */
      console.log(this._playerBoard.map(function (row) {
        return row.join(' | ');
      }).join('\n'));
    }

    /* Create a static method .generatePlayerBoard(), that will generate a blank
    board of a given size to hold the player's guesses. This function will
    dynamically generate a player's board no matter the size. (4 line 10) */

  }, {
    key: "playerBoard",
    get: function get() {
      return this._playerBoard;
    }
  }], [{
    key: "generatePlayerBoard",
    value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
      // board represents the overall game board.
      var board = [];
      for (var rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
        // row represents a single row to be added to the game board.
        var row = [];
        // for loop that loops through the number of columns specified to the function
        for (var columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
          /* Add empty spaces ' ' to each column in the row array, which should match
          the number of columns passed to the function. The empty spaces represent
          squares on the board. This code will add the correct number of
          empty spaces (' ', or squares) to each row.*/
          row.push(' ');
        }
        // push the newly-created row into the board array
        board.push(row);
      }
      // return the game board, board
      return board;
    }
  }, {
    key: "generateBombBoard",


    /* The static method, .generateBombBoard(), will dynamically generate a bomb
    board. */
    value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
      // board represents the overall bomb board.
      var board = [];
      for (var rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
        // row represents a single row to be added to the game board.
        var row = [];
        // for loop that loops through the number of columns specified to the function
        for (var columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
          /* Add null to each column in the row array, which should match
          the number of columns passed to the function. The null represents absence
          of values on the squares on the board. This code will add the correct
          number of null to each row. */
          row.push(null);
        }
        // push the newly-created row into the board array
        board.push(row);
      }

      /* numberOfBombsPlaced variable represents our bomb counter, starts at 0
      (because there's no bomb placed yet at the start). */
      var numberOfBombsPlaced = 0;

      /*  Continue adding bombs to the board until our counter reaches
      the specified number of bombs to the function (numberOfBombs).
      Note: The code in your while loop has the potential to place bombs on top
      of already existing bombs. This will be fixed with control flow. */
      while (numberOfBombsPlaced < numberOfBombs) {
        /* Generate a random location on the board (to place bombs randomly
        on the board) by first creating a variable, randomRowIndex. (in while?). */
        var randomRowIndex = Math.floor(Math.random() * numberOfRows);

        /* Generate a random location on the board (to place bombs randomly
        on the board) by first creating a variable, randomColumnIndex. (in while?). */
        var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

        /* An if statement to avoid duplicate bombs by checking if there's already
        a bomb in a tile before placing it in that same tile. */
        if (board[randomRowIndex][randomColumnIndex] !== 'B') {

          /* Use the board variable to access the space at the generated
          randomRowIndex and randomColumnIndex, set to 'B' (for bomb). */
          board[randomRowIndex][randomColumnIndex] = 'B';

          /* Increment the bomb counter, if not, the counter will stay set to 0 and
          the while loop will run forever. */
          numberOfBombsPlaced++;
        }
      }

      // return the bomb board, board
      return board;
    }
  }]);

  return Board;
}();

// /* Test the functions to make sure they function as necessary.
// Create a variable, playerBoard, set to generatePlayerBoard() with 3 and 4 as its
// two parameters. */
// let playerBoard = generatePlayerBoard(3, 4);
//
// /* Create a variable, bombBoard, set to generateBombBoard() with 3, 4 and 5 as
// its three parameters. */
// let bombBoard = generateBombBoard(3, 4, 5);
//
// /* Print both boards to the console.
// Log a message to the console. */
// console.log('Player Board: ');
//
// /* Call the printBoard() function and pass in the playerBoard variable as the
// argument. */
// printBoard(playerBoard);
//
// // Log a message to the console.
// console.log('Bomb Board: ');
//
// /* Call the printBoard() function and pass in the bombBoard variable as the
// argument. */
// printBoard(bombBoard);
//
// /* Test out the functions, flipTile() and ....
// Call the flipTile() function. Pass in playerBoard, bombBoard, 0, and 0 as
// parameters.
// (This will flip the tile at location [0,0] on the player board, and also check
// the bomb board for bombs at the location). */
// flipTile(playerBoard, bombBoard, 0, 0);
//
// /* log a message that says 'Updated Player Board:'. This will help you read the
// output clearly. */
// console.log('Updated Player Board:');
//
// /* Print out the player board to see flipTile() in action.
// Call the printBoard() function and pass in playerBoard as an argument. */
// printBoard(playerBoard);


/* --------------------------------------------------------- */

/* Instantiate the Game class (to try the classes and the methods out).
Create a constant, g and instantiate a new Game. The game should be a 3 x 3
board, with a total of 3 bombs on the board. */


var g = new Game(3, 3, 3);

// Play a move.
g.playMove(0, 0);