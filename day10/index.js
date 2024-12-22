import fs from "fs";

console.log("Calculating part one...");

const grid = fs
    .readFileSync("./day10/input.txt", "utf-8")
    .split("\n")
    .map((line) => line.trim().split(""));

const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
];

let count = 0;

for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] === "0") {
            const visted = new Set();
            const queue = [[x, y, 0]];
            const found = new Set();

            while (queue.length) {
                const [x, y, val] = queue.shift();
                visted.add(`${x},${y}`);

                if (val === 9) {
                    found.add(`${x},${y}`);
                }

                for (let direction of directions) {
                    const [dx, dy] = direction;
                    const newX = x + dx;
                    const newY = y + dy;

                    if (
                        newY >= 0 &&
                        newY < grid.length &&
                        newX >= 0 &&
                        newX < grid[0].length &&
                        Number(grid[newY][newX]) === val + 1 &&
                        val + 1 < 10
                    ) {
                        if (!visted.has(`${newX},${newY}`)) {
                            queue.push([newX, newY, val + 1]);
                        }
                    }
                }
            }

            count += found.size;
        }
    }
}

console.log(`The answer for part one is ${count}.`);

// Part two
console.log("Calculating part two...");

let count2 = 0;

for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] === "0") {
            const visted = new Set();
            const queue = [[x, y, 0]];
            const found = new Set();

            while (queue.length) {
                const [x, y, val] = queue.shift();
                visted.add(`${x},${y}`);

                if (val === 9) {
                    count2++;
                }

                for (let direction of directions) {
                    const [dx, dy] = direction;
                    const newX = x + dx;
                    const newY = y + dy;

                    if (
                        newY >= 0 &&
                        newY < grid.length &&
                        newX >= 0 &&
                        newX < grid[0].length &&
                        Number(grid[newY][newX]) === val + 1 &&
                        val + 1 < 10
                    ) {
                        if (!visted.has(`${newX},${newY}`)) {
                            queue.push([newX, newY, val + 1]);
                        }
                    }
                }
            }
        }
    }
}

console.log(`The answer for part two is ${count2}.`);
