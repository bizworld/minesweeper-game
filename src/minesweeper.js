/* Create a constant variable, generatePlayerBoard, to store a function that will
generate a blank board of a given size to hold the player's guesses.
This function will dynamically generate a player's board no matter the size. */
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
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

/* Create a constant variable, generateBombBoard, to hold a function that will
dynamically generate a bomb board. */
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
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

    /* Use the board variable and access the space at the generated
    randomRowIndex and randomColumnIndex, set to 'B' (for bomb). */
    board[randomRowIndex][randomColumnIndex] = 'B';

    /* Increment the bomb counter, if not, the counter will stay set to 0 and
    the while loop will run forever. */
    numberOfBombsPlaced+=1;
  }



  // return the bomb board, board
  return board;
};
