'use strict';

/* Format the contents of the board array in order for board to look like a game board,
by creating a constant variable, printBoard (to hold an arrow function). */
var printBoard = function printBoard(board) {
  console.log('Current Board: ');
  console.log(board[0].join(' | '));
  console.log(board[1].join(' | '));
  console.log(board[2].join(' | '));
};

/* Create a generic game board that can be used for any purpose in the future,
using a constant variable, board (that's mutable but not reassignable).
Use the board variable to store the same 3 x 3 grid structure as the previous
manually generated board. */
var board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];

/* Print the formatted board array, by calling the printBoard() function, psssing
in board as the argument to printBoard(). */
printBoard(board);