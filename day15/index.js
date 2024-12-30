import fs from "fs";

// Part one

console.log("Calculating the answer for part one...");

const [grid, inputs] = fs.readFileSync("./day15/input.txt", "utf-8").split("\n\r");

let g = grid.split("\n").map((row) => row.trim().split(""));

const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
];

function getInit(grid) {
    const startingPositions = [0, 0];
    const newGrid = [];

    for (let r = 0; r < grid.length; r++) {
        let row = [];

        for (let c = 0; c < grid[r].length; c++) {
            if (grid[r][c] === "@") {
                startingPositions[0] = r;
                startingPositions[1] = c;
            }

            row.push(grid[r][c]);
        }

        newGrid.push(row);
    }

    return [newGrid, startingPositions];
}

const [oldGrid, startingPositions] = getInit(g);
const width = g[0].length;
const height = g.length;

const curPos = [startingPositions[0], startingPositions[1]];

for (let r = 0; r < inputs.length; r++) {
    for (let c = 0; c < inputs[r].length; c++) {
        let direction;

        switch (inputs[r][c]) {
            case "<":
                direction = directions[2];
                break;
            case ">":
                direction = directions[0];
                break;
            case "^":
                direction = directions[3];
                break;
            case "v":
                direction = directions[1];
                break;
            default:
                continue;
        }

        let newR = curPos[0] + direction[0];
        let newC = curPos[1] + direction[1];

        while (newR >= 0 && newR < height && newC >= 0 && newC < width) {
            if (g[newR][newC] === "." || g[newR][newC] === "#") {
                break;
            }

            newR += direction[0];
            newC += direction[1];
        }

        if (newR >= 0 && newR < height && newC >= 0 && newC < width && g[newR][newC] !== "#") {
            g[newR][newC] = "O";
            g[curPos[0] + direction[0]][curPos[1] + direction[1]] = "@";
            g[curPos[0]][curPos[1]] = ".";
            curPos[0] = curPos[0] + direction[0];
            curPos[1] = curPos[1] + direction[1];
        }

        //console.table(g);
    }
}

let sum = 0;

for (let r = 0; r < g.length; r++) {
    for (let c = 0; c < g[r].length; c++) {
        if (g[r][c] === "O") {
            sum += r * 100 + c;
        }
    }
}

console.log(`The answer to part one is ${sum}.`);

// Part two

console.log("Calculating the answer for part two...");

g = grid.split("\n").map((row) => row.trim().split(""));
const newGrid = [];
let startR = 0,
    startC = 0;

for (let r = 0; r < g.length; r++) {
    const row = [];

    for (let c = 0; c < g[r].length; c++) {
        switch (g[r][c]) {
            case "#":
                row.push("#");
                row.push("#");
                break;
            case "O":
                row.push("[");
                row.push("]");
                break;
            case ".":
                row.push(".");
                row.push(".");
                break;
            case "@":
                row.push("@");
                row.push(".");
                startR = r;
                startC = c * 2;
                break;
        }
    }

    newGrid.push(row);
}

let curR = startR,
    curC = startC;

for (let r = 0; r < inputs.length; r++) {
    for (let c = 0; c < inputs[r].length; c++) {
        let direction;

        switch (inputs[r][c]) {
            case "<":
            case ">": {
                if (inputs[r][c] === "<") {
                    direction = directions[2];
                } else {
                    direction = directions[0];
                }

                let newR = curR + direction[0];
                let newC = curC + direction[1];

                while (newGrid[newR][newC] !== "." && newGrid[newR][newC] !== "#") {
                    newR += direction[0];
                    newC += direction[1];
                }

                if (newGrid[newR][newC] === ".") {
                    while (newR !== curR || newC !== curC) {
                        newGrid[newR][newC] = newGrid[newR - direction[0]][newC - direction[1]];

                        newR -= direction[0];
                        newC -= direction[1];
                    }

                    newGrid[curR][curC] = ".";
                    curR += direction[0];
                    curC += direction[1];
                }

                break;
            }
            case "^":
            case "v": {
                if (inputs[r][c] === "^") {
                    direction = directions[3];
                } else {
                    direction = directions[1];
                }

                const queue = [[curR, curC]];
                const seen = new Set();
                let isMoveable = true;

                while (queue.length > 0) {
                    const [topR, topC] = queue.shift();

                    if (seen.has(`${topR},${topC}`)) {
                        continue;
                    }

                    seen.add(`${topR},${topC}`);

                    const block = newGrid[topR + direction[0]][topC + direction[1]];

                    if (block === "#") {
                        isMoveable = false;
                        break;
                    } else if (block === ".") {
                        continue;
                    } else if (block === "[") {
                        queue.push([topR + direction[0], topC + direction[1]]);
                        queue.push([topR + direction[0], topC + direction[1] + 1]);
                    } else if (block === "]") {
                        queue.push([topR + direction[0], topC + direction[1]]);
                        queue.push([topR + direction[0], topC + direction[1] - 1]);
                    }
                }

                if (isMoveable) {
                    let seenArr = Array.from(seen);

                    seenArr = seenArr.map((pos) => {
                        return pos.split(",").map((p) => parseInt(p));
                    });

                    if (inputs[r][c] === "^") {
                        seenArr.sort((a, b) => a[0] - b[0]);
                    } else {
                        seenArr.sort((a, b) => b[0] - a[0]);
                    }

                    for (let i = 0; i < seenArr.length; i++) {
                        newGrid[seenArr[i][0] + direction[0]][seenArr[i][1] + direction[1]] =
                            newGrid[seenArr[i][0]][seenArr[i][1]];
                        newGrid[seenArr[i][0]][seenArr[i][1]] = ".";
                    }

                    curR += direction[0];
                    curC += direction[1];
                }

                break;
            }
            default:
                continue;
        }

        //console.table(newGrid);
    }
}

let sum2 = 0;

for (let r = 0; r < newGrid.length; r++) {
    for (let c = 0; c < newGrid[r].length; c++) {
        if (newGrid[r][c] === "[") {
            sum2 += r * 100 + c;
        }
    }
}

console.log(`The answer for part two is ${sum2}.`);
