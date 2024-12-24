import fs from "fs";
import { setTimeout } from "timers/promises";

const inputs = fs
    .readFileSync("./day14/input.txt", "utf8")
    .split("\n")
    .map((line) => {
        const matches = line.match(/(\d+)|-(\d+)/g);

        return {
            x: Number(matches[0]),
            y: Number(matches[1]),
            vx: Number(matches[2]),
            vy: Number(matches[3]),
        };
    });

const width = 101;
const height = 103;

function positiveModulo(dividend, divisor) {
    return ((dividend % divisor) + divisor) % divisor;
}

function calculatePosition(time, states) {
    let q1 = 0,
        q2 = 0,
        q3 = 0,
        q4 = 0;

    const grid = Array.from({ length: height }, () => Array(width).fill(" "));

    states.map((state) => {
        const x = positiveModulo(state.x + state.vx * time, width);
        const y = positiveModulo(state.y + state.vy * time, height);
        const midX = Math.floor(width / 2);
        const midY = Math.floor(height / 2);
        grid[y][x] = "*";

        if (x < midX && y < midY) {
            q1++;
        } else if (x > midX && y < midY) {
            q2++;
        } else if (x < midX && y > midY) {
            q3++;
        } else if (x > midX && y > midY) {
            q4++;
        }
    });

    for (let y = 0; y < height; y++) {
        let count = 0;

        for (let x = 1; x < width; x++) {
            if (grid[y][x] === "*" && grid[y][x - 1] === "*") {
                count++;
            }

            if (count >= 15) {
                printGrid(grid);
                console.log(`Time: ${time}`);
                return "Done!";
            }
        }
    }

    return q1 * q2 * q3 * q4;
}

function printGrid(grid) {
    for (let y = 0; y < height; y++) {
        let line = "";

        for (let x = 0; x < width; x++) {
            line += grid[y][x];
        }

        console.log(line);
    }
}

console.log(`The answer for part one is ${calculatePosition(17, inputs)}.`);
let i = 1;

while (true) {
    let status = calculatePosition(i, inputs);
    i++;

    if (status === "Done!") {
        break;
    }
}

console.log(`The answer for part two is ${i}.`);
