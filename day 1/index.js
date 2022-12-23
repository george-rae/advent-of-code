const fs = require("fs");
const input = fs.readFileSync("./input.txt", { encoding: "utf-8"} );

const split = input.split("\n\n").map(
  (cals) => cals.split("\n")
  .reduce((total, current ) => total + parseInt(current, 10), 0)
);

const sortedElfs = split.sort((a, b) => b - a);

console.log(sortedElfs[0]); // Part 1

const top3 = sortedElfs.slice(0, 3).reduce((total, current) => total + current, 0);
console.log(top3) // Part 2