import fs from "fs";

const grid = fs
    .readFileSync("./day20/input.txt", "utf8")
    .split("\n")
    .map((line) => line.trim().split(""));

//console.table(grid);

const start = { x: 0, y: 0 };
const end = { x: 0, y: 0 };

for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === "S") {
            start.x = j;
            start.y = i;
        } else if (grid[i][j] === "E") {
            end.x = j;
            end.y = i;
        }
    }
}

const queue = [{ ...start, time: 0 }];
const visited = new Map();
const directions = { left: [-1, 0], right: [1, 0], up: [0, -1], down: [0, 1] };

while (queue.length > 0) {
    const top = queue.shift();

    if (visited.has(`${top.x},${top.y}`)) {
        continue;
    }

    visited.set(`${top.x},${top.y}`, top.time);

    if (top.x === end.x && top.y === end.y) {
        break;
    }

    for (const [direction, [dx, dy]] of Object.entries(directions)) {
        const x = top.x + dx;
        const y = top.y + dy;

        if (x < 0 || x >= grid[0].length || y < 0 || y >= grid.length || grid[y][x] === "#") {
            continue;
        }

        queue.push({ x, y, time: top.time + 1 });
    }
}

//console.log(visited);

function findNumberOfGoodCheats(path, grid, n, timeSaved) {
    let count = 0;

    for (const [coord, time] of path) {
        const [x, y] = coord.split(",").map(Number);
        const visited = new Map();
        let queue = new Array();
        let queue2 = new Array();
        queue.push({ x, y, time });

        for (let i = 0; i < n + 1; i++) {
            while (queue.length > 0) {
                const top = queue.shift();

                if (visited.has(`${top.x},${top.y}`) && visited.get(`${top.x},${top.y}`) <= top.time) {
                    continue;
                }

                visited.set(`${top.x},${top.y}`, top.time);

                for (const [direction, [dx, dy]] of Object.entries(directions)) {
                    const x = top.x + dx;
                    const y = top.y + dy;

                    if (x < 0 || x >= grid[0].length || y < 0 || y >= grid.length) {
                        continue;
                    }

                    queue2.push({ x, y, time: top.time + 1 });
                }
            }

            queue = queue2;
            queue2 = new Array();
        }

        for (const [coord2, newTime] of visited) {
            const [x2, y2] = coord2.split(",").map(Number);

            if (grid[y2][x2] === "#") {
                continue;
            }

            const oldTime = path.get(coord2);

            if (oldTime - newTime >= timeSaved) {
                count++;
            }
        }
    }

    return count;
}

console.log(`The answer to part 1 is ${findNumberOfGoodCheats(visited, grid, 2, 100)}.`);
console.log(`The answer to part 2 is ${findNumberOfGoodCheats(visited, grid, 20, 100)}.`);
