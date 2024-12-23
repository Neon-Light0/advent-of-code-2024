import fs from "fs";

// Part one
console.log("Calculating the answer to part one...");

const grid = fs
    .readFileSync("./day12/input.txt", "utf-8")
    .split("\n")
    .map((line) => {
        return line.trim().split("");
    });

const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
];

let totalCost = 0;
let totalAdjustedCost = 0;
const visited = new Set();

for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
        if (!visited.has(`${i},${j}`)) {
            let area = 0;
            let perimeter = 0;
            const curPlant = grid[i][j];
            const queue = [[i, j, curPlant]];

            const sides = new Map();

            while (queue.length) {
                const [r, c, plant] = queue.shift();

                if (visited.has(`${r},${c}`)) {
                    continue;
                }

                area++;
                visited.add(`${r},${c}`);

                for (let k = 0; k < directions.length; k++) {
                    const [dr, dc] = directions[k];
                    const newR = r + dr;
                    const newC = c + dc;

                    if (
                        newR < 0 ||
                        newR >= grid.length ||
                        newC < 0 ||
                        newC >= grid[newR].length ||
                        grid[newR][newC] !== plant
                    ) {
                        perimeter++;

                        switch (k) {
                            case 0:
                            case 1: {
                                const key = `c{${k},${c}}`;

                                if (!sides.has(key)) {
                                    sides.set(key, []);
                                }

                                sides.get(key).push(r);
                                break;
                            }
                            case 2:
                            case 3:
                                const key = `r{${k},${r}}`;

                                if (!sides.has(key)) {
                                    sides.set(key, []);
                                }

                                sides.get(key).push(c);
                                break;
                        }
                    }

                    if (
                        newR >= 0 &&
                        newR < grid.length &&
                        newC >= 0 &&
                        newC < grid[newR].length &&
                        grid[newR][newC] === plant &&
                        !visited.has(`${newR},${newC}`)
                    ) {
                        queue.push([newR, newC, plant]);
                    }
                }
            }

            totalCost += area * perimeter;
            let adjustedPerimeter = 0;

            for (const side of sides) {
                const [key, values] = side;
                values.sort((a, b) => a - b);
                let count = 1;

                for (let i = 1; i < values.length; i++) {
                    if (values[i] - values[i - 1] > 1) {
                        count++;
                    }
                }

                adjustedPerimeter += count;
            }

            totalAdjustedCost += area * adjustedPerimeter;
        }
    }
}

console.log(`The anwer to part one is ${totalCost}.`);

// Part two
console.log("Calculating the answer to part two...");

console.log(`The anwer to part two is ${totalAdjustedCost}.`);
