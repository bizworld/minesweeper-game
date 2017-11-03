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
};

/* Build one of the main pieces of Minesweeper functionality: displaying the
number of bombs adjacent to the flipped (or clicked) tile.
Create a constant variable, getNumberOfNeighborBombs, set to an arrow function
that accepts 3 parameters: bombBoard, rowIndex, columnIndex.
This will calculate the number of bombs next to the square at the given rowIndex
and columnIndex on the provided bombBoard. */
var getNumberOfNeighborBombs = function getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex) {
  var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

  var numberOfRows = bombBoard.length;
  var numberOfColumns = bombBoard[0].length;

  /* The numberOfBombs variable (initially set to 0) will be used to store the
  number of bombs adjacent to the flipped tile. It should be created with `let`
  not `const` since its value will change. */
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
      /* Check if the tile at those indices (on the bombBoard) already contains
      a bomb ('B'). */
      if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
        // increment numberOfBombs if  both of these conditions are met
        numberOfBombs++;
      }
    }
  });

  /* The purpose of this function is to return the number of bombs in an
  adjacent neighbor. */
  return numberOfBombs;
};

/* A function that will allow the user/player to flip a tile and to update that
tile accordingly. It accepts 4 parameters: playerBoard, bombBoard, rowIndex,
columnIndex. */
var flipTile = function flipTile(playerBoard, bombBoard, rowIndex, columnIndex) {

  /* Check to see if the specified tile in playerBoard
  (using rowIndex and columnIndex) is not empty i.e. ' ' (already been flipped).
  Also add an else if statement to check if there is a bomb, 'B' at the
  specified tile on the bombBoard. */
  if (playerBoard[rowIndex][columnIndex] !== ' ') {
    return "This tile has already been flipped!";
  } else if (bombBoard[rowIndex][columnIndex] === 'B') {
    // Place a bomb on the player board by checking the bomb board (else if cond.)
    playerBoard[rowIndex][columnIndex] = 'B';
  } else {
    /* Let the user flip the tile and then display the number of neighboring
    bombs on that same tile.
    Set the specified tile on playerBoard to calling getNumberOfNeighborBombs
    with bombBoard, rowIndex, and columnIndex as arguments. */
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
  }
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