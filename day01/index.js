import fs from "fs";

// Part 1
console.log("Calculating the answer for day 1 part 1...");

const input = fs.readFileSync("./day01/input.txt", "utf-8");
const lines = input.split("\n");

console.time("Part 1 execution time");

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

console.timeEnd("Part 1 execution time");
console.log(`The answer for day 1 part 1 is: ${sum}.\n`);

// Part 2
console.log("Calculating the answer for day 1 part 2...");

console.time("Part 2 execution time");
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

console.timeEnd("Part 2 execution time");
console.log(`The answer for day 1 part 2 is: ${similarityScore}.`);
