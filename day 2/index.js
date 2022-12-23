const fs = require("fs");

/*
  The winner of the whole tournament is the player with the highest score.
  Your total score is the sum of your scores for each round. The score for a
  single round is the score for the shape you selected (1 for Rock, 2 for
  Paper, and 3 for Scissors) plus the score for the outcome of the round (0
  if you lost, 3 if the round was a draw, and 6 if you won).
  { 
    Rock: A, X, 1
    Paper: B, Y, 2
    Scissors: C, Z, 3 
  }
*/

// Rock < Paper < Scissors
const O_MOVES = ["A", "B", "C"]; // Opponent move map
const P_MOVES = ["X", "Y", "Z"]; // Player move map

function readRounds() {
  const input = fs.readFileSync("./input.txt", { encoding: "utf-8"} ); // import the input file with the moves.
  const lines = input.split("\n"); // Split it into an array of individual lines.

  const results = []; // blank array to push the results into.

  
  lines.forEach((line) => {
    const [O, P] = line.split(" "); // Array of set of moves.
    const omove = O_MOVES.indexOf(O); // Get the index of the opponents move
    const pmove = P_MOVES.indexOf(P); // Get the index of the player move

    results.push({
      round: `Opponent: ${O} - Player: ${P}`,
      score: outcome(omove, P) + (pmove + 1),
      score2: outcomePart2(O, P)
    })
  });

  return results;
}

// Get whether or not you won the match.
function win(opponent) {
  return P_MOVES[(opponent + 1) % P_MOVES.length]; // Get the remainder to determine what the winning move would be from player moveset. (modulo actually cool)
}

// Get whether you drew the match.
function draw(opponent) {
  return P_MOVES[opponent]; // Return the index of the opponent move in comparison to player move.
}

// Get whether you lost the match.
function loss(opponent) {
  return P_MOVES[opponent > 0 ? opponent - 1 : P_MOVES.length - 1];
}

// Get the outcome of the match using the above 2 functions as reference
function outcome(opponent, player) {
  switch (player) {
    case win(opponent): // Get the winning move and see if it matches
      return 6; // win = 6 points
    case draw(opponent): // If they match it's a draw
      return 3; // draw = 3 points
    default:
      return 0; // loss = nil
  }
}

function outcomePart2(opponent, player) {
  const oindex = O_MOVES.indexOf(opponent);
  const playermove = (move) => P_MOVES.indexOf(move) + 1;
  switch(player) {
    case "Z": // must win
      return 6 + playermove(win(oindex));
    case "Y": // must draw
      return 3 + playermove(draw(oindex));
    default: // must lose
      return 0 + playermove(loss(oindex));
  }
}

const results = readRounds();

console.log(
  `Total: ${results.reduce((total, round) => (total += round.score), 0)}`
)

console.log(
  `Total (Rigged): ${results.reduce((total, round) => (total += round.score2), 0)}`
)