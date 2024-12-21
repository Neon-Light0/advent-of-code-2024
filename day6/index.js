import fs from "fs";

// Part 1
console.log("Calculating the answer for day 6...");

const grid = fs
    .readFileSync("./day6/input.txt", "utf-8")
    .split("\n")
    .map((line) => {
        return line.trim().split("");
    });

let startX = 0,
    startY = 0;

for (let i = 0; i < grid.length; i++) {
    let found = false;

    for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === "^") {
            startY = i;
            startX = j;
            found = true;
            break;
        }
    }

    if (found) break;
}

const directions = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
];

let curDirection = 0;
let paths = new Set();

let x = startX,
    y = startY;

while (x >= 0 && x < grid.length && y >= 0 && y < grid[0].length) {
    if (grid[y][x] === "#") {
        x -= directions[curDirection][0];
        y -= directions[curDirection][1];
        curDirection = (curDirection + 1) % 4;
    } else {
        paths.add(`${x},${y}`);
        x += directions[curDirection][0];
        y += directions[curDirection][1];
    }
}

console.log(`The answer for part 1 is: ${paths.size}.`);

// Part 2

let count = 0;

for (let coord of paths) {
    let [pathX, pathY] = coord.split(",").map(Number);

    if (pathX === startX && pathY === startY) continue;

    let x = startX;
    let y = startY;
    let curDirection = 0;
    let foundNodes = new Set();

    while (x >= 0 && x < grid.length && y >= 0 && y < grid[0].length) {
        if (grid[y][x] === "#" || (x === pathX && y === pathY)) {
            x -= directions[curDirection][0];
            y -= directions[curDirection][1];
            curDirection = (curDirection + 1) % 4;
        } else {
            if (foundNodes.has(`${x},${y},${curDirection}`)) {
                count++;
                break;
            } else {
                foundNodes.add(`${x},${y},${curDirection}`);
            }

            x += directions[curDirection][0];
            y += directions[curDirection][1];
        }
    }
}

console.log(`The answer for part 2 is: ${count}.`);
