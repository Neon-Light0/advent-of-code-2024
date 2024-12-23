import fs from "fs";

// Part 1
console.log("Calculating the answer for day 4 part 1...");

const input = fs
    .readFileSync("./day04/input.txt", "utf-8")
    .split("\n")
    .map((line) => line.split(""));

console.time("Part one execution time");

const directions = [
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
];

let countXMAS = 0;

for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
        if (input[i][j] !== "X") continue;

        for (let k = 0; k < directions.length; k++) {
            let x = i,
                y = j;
            let isFound = false;

            for (let l = 0; l < 3; l++) {
                x += directions[k][0];
                y += directions[k][1];

                if (x < 0 || x >= input.length || y < 0 || y >= input[i].length) {
                    break;
                } else if (l === 0 && input[x][y] !== "M") {
                    break;
                } else if (l === 1 && input[x][y] !== "A") {
                    break;
                } else if (l === 2 && input[x][y] !== "S") {
                    break;
                }

                if (l === 2) isFound = true;
            }

            if (isFound) countXMAS++;
        }
    }
}

console.timeEnd("Part one execution time");
console.log(`The answer for day 4 part 1 is: ${countXMAS}.\n`);

console.log("Calculating the answer for day 4 part 2...");
console.time("Part two execution time");

let countMAS = 0;

for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
        if (input[i][j] !== "A") continue;

        const left = i - 1,
            right = i + 1;
        const up = j - 1,
            down = j + 1;

        if (left >= 0 && right < input.length && up >= 0 && down < input[i].length) {
            if (
                input[left][up] === "M" &&
                input[right][up] === "M" &&
                input[right][down] === "S" &&
                input[left][down] === "S"
            ) {
                countMAS++;
            } else if (
                input[left][up] === "M" &&
                input[right][up] === "S" &&
                input[right][down] === "S" &&
                input[left][down] === "M"
            ) {
                countMAS++;
            } else if (
                input[left][up] === "S" &&
                input[right][up] === "S" &&
                input[right][down] === "M" &&
                input[left][down] === "M"
            ) {
                countMAS++;
            } else if (
                input[left][up] === "S" &&
                input[right][up] === "M" &&
                input[right][down] === "M" &&
                input[left][down] === "S"
            ) {
                countMAS++;
            }
        }
    }
}

console.timeEnd("Part two execution time");
console.log(`The answer for day 4 part 2 is: ${countMAS}.`);
