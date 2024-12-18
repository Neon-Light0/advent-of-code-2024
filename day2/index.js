import fs from "fs";

// Part 1
console.log("Calculating the answer for day 2 part 1...");

const input = fs.readFileSync("./day2/input.txt", "utf-8");
const lines = input.split("\n");

let nSafeReports = 0;

lines.forEach((line) => {
  const nums = line.split(" ");
  let isSafe = true;
  let isAscending = false;

  for (let i = 1; i < nums.length; i++) {
    const diff = Number(nums[i]) - Number(nums[i - 1]);

    if (i === 1) isAscending = diff > 0;

    if (
      Math.abs(diff) > 3 ||
      diff === 0 ||
      (isAscending && diff < 0) ||
      (!isAscending && diff > 0)
    ) {
      isSafe = false;
      break;
    }
  }

  if (isSafe) nSafeReports++;
});

console.log(`The answer for day 2 part 1 is: ${nSafeReports}.\n`);

// Part 2
console.log("Calculating the answer for day 2 part 2...");
