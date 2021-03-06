/* The Board class contains all of the functionality of creating player boards,
game boards, and printing the boards. Exporting the Board class,
using `export as declared` syntax. */
export class Board {
  /* Add a constructor() method for the class, to be able to use the class later
  (as an object)
  The parameters represent the board size and the number of bombs on the board. */
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    // set an instance's properties.
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns; // represents the size of the game board
    // instance property set to the value of a static method called on Board
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  /* Add a getter method, playerBoard() to the Board class, that returns or gets
  an instance's player board. */
  get playerBoard() {
    return this._playerBoard;
  }

  /* Add the flipTile() function to the Board class and update it to a method.
  A method that will allow the player to flip a tile and to update that tile
  accordingly. */
  flipTile(rowIndex, columnIndex) {

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
  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    const neighborOffsets = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1]
    ];

    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;

    /* The numberOfBombs variable (initially set to 0) will be used to store the
    number of bombs adjacent to the flipped tile. It should be created with `let`
    not `const` since its value will change.
    The numberOfBombs variable should not be changed (to this._numberOfBombs)
    because it's a variable in the function, not a direct class property. */
    let numberOfBombs = 0;

    /* Call the .forEach() method on the neighborOffsets array.
    The .forEach() requires a callback method. Pass one in as an arrow function.
    The arrow function should take one parameter, offset. */
    neighborOffsets.forEach(offset => {
      /* Create neighborRowIndex and set to the sum of rowIndex and the first
      element of offset. */
      const neighborRowIndex = rowIndex + offset[0];

      /* Create neighborColumnIndex and set to the sum of columnIndex and the
      second element of offset. */
      const neighborColumnIndex = columnIndex + offset[1];

      /* Check if the row and column indices for neighboring tiles are valid
      (for example, we don't want to check tiles that are "off the grid" and
      don't exist). */
      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows &&
      neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
        /* Check if the tile at those indices (on the this._bombBoard class property)
        already contains a bomb ('B'). */
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
          // increment numberOfBombs counter if both of these conditions are met
          numberOfBombs++;
        }

      }

    });

    /* The purpose of this method is to return the number of bombs in an
    adjacent neighbor. */
    return numberOfBombs;

  };

  /* A way to inform the user that they've won the game.
  A user wins when there are no non-bomb ("safe") tiles remaining to be flipped.
  .hasSafeTiles() method will need to check the numberOfTiles on the board
  vs. the numberOfBombs on the board. */
  hasSafeTiles() {
    // no need for an if statement, since the expression it's checking is truthy
    return this._numberOfTiles !== this._numberOfBombs;
  }

  /*  A .print() method to print the formatted this._playerBoard instance
  property. */
  print() {
    /* This .map() method returns an array of formatted rows. Also, chain a
    .join() method call onto your .map() method call (with '\n' as the separator)
    to join together the array of rows with new lines, placing each row on its own
    line when printed. Then wrap this line of code with console.log() in order to
    log the formatted board to the console. */
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  }

  /* Create a static method .generatePlayerBoard(), that will generate a blank
  board of a given size to hold the player's guesses. This function will
  dynamically generate a player's board no matter the size. (4 line 10) */
  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    // board represents the overall game board.
    const board = [];
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      // row represents a single row to be added to the game board.
      const row = [];
      // for loop that loops through the number of columns specified to the function
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++){
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

  /* The static method, .generateBombBoard(), will dynamically generate a bomb
  board. */
  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    // board represents the overall bomb board.
    const board = [];
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      // row represents a single row to be added to the game board.
      const row = [];
      // for loop that loops through the number of columns specified to the function
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++){
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
    let numberOfBombsPlaced = 0;

    /*  Continue adding bombs to the board until our counter reaches
    the specified number of bombs to the function (numberOfBombs).
    Note: The code in your while loop has the potential to place bombs on top
    of already existing bombs. This will be fixed with control flow. */
    while (numberOfBombsPlaced < numberOfBombs) {
      /* Generate a random location on the board (to place bombs randomly
      on the board) by first creating a variable, randomRowIndex. (in while?). */
      let randomRowIndex = Math.floor(Math.random() * numberOfRows);

      /* Generate a random location on the board (to place bombs randomly
      on the board) by first creating a variable, randomColumnIndex. (in while?). */
      let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

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



}
