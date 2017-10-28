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
  // return the bomb board, board
  return board;
};