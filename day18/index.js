import fs from "fs";
import heap from "collections/heap.js";

const input = fs
    .readFileSync("./day18/input.txt", "utf8")
    .split("\n")
    .map((line) => {
        const [x, y] = line.trim().split(",");
        return [parseInt(x), parseInt(y)];
    });

const dimensions = 71;
//const dimensions = 7;
const nBytes = 1024;
//const nBytes = 12;

const grid = Array(dimensions)
    .fill()
    .map(() => Array(dimensions).fill("."));

//console.table(grid);

for (let i = 0; i < nBytes; i++) {
    grid[input[i][1]][input[i][0]] = "#";
}

//console.table(grid);

function findMinDistance(grid) {
    const start = { x: 0, y: 0 };
    const end = { x: 70, y: 70 };

    const directions = { left: [0, -1], right: [0, 1], up: [-1, 0], down: [1, 0] };
    const h = new heap([], null, (a, b) => b.distance - a.distance);
    h.push({ x: start.x, y: start.y, distance: 0 });
    const costs = new Map();

    while (h.length > 0) {
        const { x, y, distance } = h.pop();

        if (costs.has(`${x},${y}`) && costs.get(`${x},${y}`) <= distance) {
            continue;
        }

        costs.set(`${x},${y}`, distance);

        if (x === end.x && y === end.y) {
            return { status: "success", distance };
        }

        for (const direction in directions) {
            const [dx, dy] = directions[direction];
            const newX = x + dx;
            const newY = y + dy;

            if (newX >= 0 && newX < dimensions && newY >= 0 && newY < dimensions && grid[newY][newX] !== "#") {
                h.push({ x: newX, y: newY, distance: distance + 1 });
            }
        }
    }

    return { status: "failure" };
}

const result1 = findMinDistance(grid);

if (result1.status === "success") {
    console.log(`Part one answer: ${result1.distance}`);
}

// Part two

const grid2 = Array(dimensions)
    .fill()
    .map(() => Array(dimensions).fill("."));

for (let i = 0; i < input.length; i++) {
    grid2[input[i][1]][input[i][0]] = "#";

    const result2 = findMinDistance(grid2);

    if (result2.status === "failure") {
        console.log(`The answer to part two is : ${input[i][0]}, ${input[i][1]}`);
        break;
    }
}
