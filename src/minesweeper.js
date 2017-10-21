/* Hard code or manually create an empty game board and save to a constant
variable, blankLine */
const blankLine = ' | | ';

/* Print the empty game board by using console.log to print a message and
to log or print the blankLine constant three times */
console.log("This is what an empty board would look like: ");
console.log(blankLine);
console.log(blankLine);
console.log(blankLine);

/* Create a constant variable, guessLine, to hold a hard-coded row.
guessLine represents what a board row will look like when a player guesses
by "clicking" (selecting) the first square of this row. */
const guessLine = '1 | | ';

/* Create a constant variable, bombLine, to hold a hard-coded row.
bombLine represents what a board row will look like when a player clicks
and reveals a bomb. */
const bombLine = ' | B | ';
