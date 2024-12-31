import fs from "fs";
import heap from "collections/heap.js";

// Part one

console.log("Calculating answers...");

const grid = fs
    .readFileSync("./day16/input.txt", "utf-8")
    .split("\n")
    .map((row) => row.trim().split(""));

//console.table(grid);

let startR, startC;
let endR, endC;

for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
        if (grid[r][c] === "S") {
            startR = r;
            startC = c;
        } else if (grid[r][c] === "E") {
            endR = r;
            endC = c;
        }
    }
}

const costs = new Map();
costs.set(`${startR},${startC}`, 0);
const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
];
const h = new heap([], null, (a, b) => b.distance - a.distance);
h.push({ r: startR, c: startC, distance: 0, direction: 1, path: [`${startR},${startC},${1}`] });
const tiles = new Set();
let minCost = Infinity;
let printed = false;

while (h.length > 0) {
    const { r, c, distance, direction, path } = h.pop();

    if (r === endR && c === endC) {
        if (distance <= minCost) {
            if (!printed) {
                console.log(`The answer to part one is ${distance}.`);
                printed = true;
            }
            path.forEach((element) => {
                const [r, c] = element.split(",").map(Number);
                tiles.add(`${r},${c}`);
            });

            minCost = distance;
        }

        continue;
    }

    for (let i = 0; i < 4; i++) {
        let newDistance = 0;
        let newR, newC;

        if (direction != i) {
            const right = (direction - i + 4) % 4;
            const left = (i - direction + 4) % 4;
            newDistance = distance + Math.min(left, right) * 1000;
            newR = r;
            newC = c;
        } else {
            const [dr, dc] = directions[i];
            newR = r + dr;
            newC = c + dc;
            newDistance = distance + 1;
        }

        if (newR < 0 || newR >= grid.length || newC < 0 || newC >= grid[newR].length || grid[newR][newC] === "#") {
            continue;
        }

        const key = `${newR},${newC},${i}`;

        if (!costs.has(key)) {
            costs.set(key, newDistance);
            h.push({ r: newR, c: newC, distance: newDistance, direction: i, path: [...path, key] });
        } else if (costs.get(key) > newDistance) {
            costs.set(key, newDistance);
            h.push({ r: newR, c: newC, distance: newDistance, direction: i, path: [...path, key] });
        } else if (costs.get(key) === newDistance) {
            h.push({ r: newR, c: newC, distance: newDistance, direction: i, path: [...path, key] });
        }
    }
}

//console.table(tiles);
console.log(`The answer to part two is ${tiles.length}.`);

/*
for (let coord of tiles) {
    const [r, c] = coord.split(",").map(Number);
    grid[r][c] = "0";
}
*/

//console.table(grid);
//console.table(costs);
