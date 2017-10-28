'use strict';

/* Create a constant variable, generatePlayerBoard, to store a function that will
generate a blank board of a given size to hold the player's guesses. */
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

/* testing the generatePlayerBoard() function with a few diff sets of arguments
in console.log (delete these calls, once done). */
console.log(generatePlayerBoard(3, 3));