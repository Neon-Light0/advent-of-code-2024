import fs from "fs";

// Part 1
console.log("Calculating the answer for day 1 part 1...");

const input = fs.readFileSync("./day1/input.txt", "utf-8");
const lines = input.split("\n");

const left = [];
const right = [];

lines.forEach((line) => {
  const [l, r] = line.split("   ");
  left.push(Number(l));
  right.push(Number(r));
});

left.sort((a, b) => a - b);
right.sort((a, b) => a - b);

let sum = 0;

for (let i = 0; i < left.length; i++) {
  sum += Math.abs(left[i] - right[i]);
}

console.log(`The answer for day 1 part 1 is: ${sum}.\n`);

// Part 2
console.log("Calculating the answer for day 1 part 2...");

const rightMap = {};

right.forEach((num) => {
  if (rightMap[num]) {
    rightMap[num]++;
  } else {
    rightMap[num] = 1;
  }
});

let similarityScore = 0;

left.forEach((num) => {
  if (rightMap[num]) {
    similarityScore += num * rightMap[num];
  }
});

console.log(`The answer for day 1 part 2 is: ${similarityScore}.`);
