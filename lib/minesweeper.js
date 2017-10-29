'use strict';

/* Create a constant variable, generatePlayerBoard, to store a function that will
generate a blank board of a given size to hold the player's guesses.
This function will dynamically generate a player's board no matter the size. */
var generatePlayerBoard = function generatePlayerBoard(numberOfRows, numberOfColumns) {
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
};

/* Create a constant variable, generateBombBoard, to hold a function that will
dynamically generate a bomb board. */
var generateBombBoard = function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
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

    /* Use the board variable and access the space at the generated
    randomRowIndex and randomColumnIndex, set to 'B' (for bomb). */
    board[randomRowIndex][randomColumnIndex] = 'B';

    /* Increment the bomb counter, if not, the counter will stay set to 0 and
    the while loop will run forever. */
    numberOfBombsPlaced += 1;
  }

  // return the bomb board, board
  return board;
};

/*  Create a constant variable, printBoard, set to to an arrow function that
accepts one parameter, board. */
var printBoard = function printBoard(board) {
  /* This .map() method returns an array of formatted rows. Also, chain a
  .join() method call onto your .map() method call (with '\n' as the separator)
  to join together the array of rows with new lines, placing each row on its own
  line when printed. Then wrap this line of code with console.log() in order to
  log the formatted board to the console. */
  console.log(board.map(function (row) {
    return row.join(' | ');
  }).join('\n'));
};

/* Test the functions to make sure they function as necessary.
Create a variable, playerBoard, set to generatePlayerBoard() with 3 and 4 as its
two parameters. */
var playerBoard = generatePlayerBoard(3, 4);

/* Create a variable, bombBoard, set to generateBombBoard() with 3, 4 and 5 as
its three parameters. */
var bombBoard = generateBombBoard(3, 4, 5);

/* Print both boards to the console.
Log a message to the console. */
console.log('Player Board: ');

/* Call the printBoard() function and pass in the playerBoard variable as the
argument. */
printBoard(playerBoard);

// Log a message to the console.
console.log('Bomb Board: ');

/* Call the printBoard() function and pass in the bombBoard variable as the
argument. */
printBoard(bombBoard);