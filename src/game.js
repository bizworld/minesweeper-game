// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`


/* import the Board class from the board.js file, in the same directory, ./
(i.e. src/), (into the game.js file) so that the code in this file, game.js,
can access it and function properly. */
import { Board } from './board';

/* The Game class utilizes the Board class by making calls to the methods in
the Board class. */
class Game {
  /* To call Board methods, we'll have to create an instance of a Board inside
  of the Game constructor. */
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    /* instance property, this._board (the board that we will call Board methods on),
    set to an instance of Board, passing in the Game constructor's parameters
    as arguments. */
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  /* The .playMove() method includes all of the functionality needed to play a
  session of Minesweeper, i.e. flipping a tile, letting the user know if they
  discovered a bomb, and allowing a user to continue otherwise (until they win,
  or lose). */
  playMove(rowIndex, columnIndex) {
    // start by flipping a specified tile when .playMove() is called.
    this._board.flipTile(rowIndex, columnIndex);

    /* The logic that determines what should happen after a player flips a tile.
    if statement checks if the playerBoard provided by this._board has a B at
    the given row index and column index. */
    if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      console.log("The game is over!"); // or "Game Over! Final Board: "
      this._board.print(); // print the board
    } else if (!this._board.hasSafeTiles()) { //checks if there are no safe tiles on this._board.
      console.log("Congratulations, you won!");
    } else {
      console.log("Current Board: ");
      this._board.print();
    }

  }



}
