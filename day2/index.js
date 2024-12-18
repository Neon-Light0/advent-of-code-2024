import fs from "fs";

// Part 1
console.log("Calculating the answer for day 2 part 1...");

const input = fs
  .readFileSync("./day2/input.txt", "utf-8")
  .split("\n")
  .map((line) => line.split(" "));

function isStrictlyIncreasingWithTolerance(line, limit) {
  let prev = line[0];

  for (let i = 1; i < line.length; i++) {
    let cur = line[i];
    const diff = Number(cur) - Number(prev);

    if (diff > 3 || diff <= 0) {
      if (limit === 0) return 0;
      return Math.max(
        isStrictlyIncreasingWithTolerance(
          [...line.slice(0, i - 1), ...line.slice(i)],
          limit - 1
        ),
        isStrictlyIncreasingWithTolerance(
          [...line.slice(0, i), ...line.slice(i + 1)],
          limit - 1
        )
      );
    }

    prev = cur;
  }

  return 1;
}

function isStrictlyDecreasingWithTolerance(line, limit) {
  let prev = line[0];

  for (let i = 1; i < line.length; i++) {
    let cur = line[i];
    const diff = Number(prev) - Number(cur);

    if (diff > 3 || diff <= 0) {
      if (limit === 0) return 0;
      return Math.max(
        isStrictlyDecreasingWithTolerance(
          [...line.slice(0, i - 1), ...line.slice(i)],
          limit - 1
        ),
        isStrictlyDecreasingWithTolerance(
          [...line.slice(0, i), ...line.slice(i + 1)],
          limit - 1
        )
      );
    }

    prev = cur;
  }

  return 1;
}

console.time("part 1 execution time ");

let nSafeReports = 0;

input.forEach((line) => {
  nSafeReports += Math.max(
    isStrictlyIncreasingWithTolerance(line, 0),
    isStrictlyDecreasingWithTolerance(line, 0)
  );
});

console.timeEnd("part 1 execution time ");
console.log(`The answer for day 2 part 1 is: ${nSafeReports}.\n`);

// Part 2
console.log("Calculating the answer for day 2 part 2...");

console.time("part 2 execution time ");
let nSafeReportsWithTolerate = 0;

input.forEach((line) => {
  nSafeReportsWithTolerate += Math.max(
    isStrictlyIncreasingWithTolerance(line, 1),
    isStrictlyDecreasingWithTolerance(line, 1)
  );
});

console.timeEnd("part 2 execution time ");
console.log(`The answer for day 2 part 2 is: ${nSafeReportsWithTolerate}.\n`);
