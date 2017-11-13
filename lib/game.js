'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* import the Board class from the board.js file (it into game.js) so that the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     code in this file, game.js can access it and function properly. */


var _board = require('./board');

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
    this._board = new _board.Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  /* The .playMove() method includes all of the functionality needed to play a
  session of Minesweeper, i.e. flipping a tile, letting the user know if they
  discovered a bomb, and allowing a user to continue otherwise (until they win,
  or lose). */


  _createClass(Game, [{
    key: 'playMove',
    value: function playMove(rowIndex, columnIndex) {
      // start by flipping a specified tile when .playMove() is called.
      this._board.flipTile(rowIndex, columnIndex);

      /* The logic that determines what should happen after a player flips a tile.
      if statement checks if the playerBoard provided by this._board has a B at
      the given row index and column index. */
      if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
        console.log("The game is over!"); // or "Game Over! Final Board: "
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