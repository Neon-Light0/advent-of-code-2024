import fs from "fs";

// Part 1
console.log("Calculating the answer for day 3 part 1...");

const input = fs.readFileSync("./day3/input.txt", "utf-8");

console.time("Part one execution time");
const regex = /mul\((\d+),(\d+)\)/g;
const matches = input.matchAll(regex);

let sum = 0;

matches.forEach((match) => {
  sum += match[1] * match[2];
});

console.timeEnd("Part one execution time");
console.log(`The answer for day 3 part 1 is: ${sum}.\n`);

// Part 2
console.log("Calculating the answer for day 3 part 2...");

console.time("Part two execution time");
const regex2 = /mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g;
const matches2 = input.matchAll(regex2);

sum = 0;
let enable = true;

matches2.forEach((match) => {
  if (match[0] === "do()") {
    enable = true;
  } else if (match[0] === "don't()") {
    enable = false;
  } else if (enable) {
    sum += match[1] * match[2];
  }
});

console.timeEnd("Part two execution time");
console.log(`The answer for day 3 part 2 is: ${sum}.`);
