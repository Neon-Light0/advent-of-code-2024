import fs from "fs";

console.log("Calculating the anwser to day 8...\n");

const grid = fs
    .readFileSync("./day08/input.txt", "utf-8")
    .split("\n")
    .map((line) => line.trim().split(""));

const towerLocations = new Map();

let n = grid.length,
    m = grid[0].length;

for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
        if (!grid[i][j].match(/[a-zA-Z0-9]/)) continue;

        if (towerLocations.has(grid[i][j])) {
            towerLocations.get(grid[i][j]).push([i, j]);
        } else {
            towerLocations.set(grid[i][j], [[i, j]]);
        }
    }
}

let found = new Set();

for (let [key, spots] of towerLocations) {
    for (let i = 0; i < spots.length; i++) {
        for (let j = 0; j < spots.length; j++) {
            if (i === j) continue;

            const dr = spots[i][0] - spots[j][0];
            const dc = spots[i][1] - spots[j][1];
            const r = spots[j][0] - dr;
            const c = spots[j][1] - dc;

            if (r >= 0 && r < n && c >= 0 && c < m) {
                found.add(`${r},${c}`);
            }
        }
    }
}

console.log(`The anwser to part one is: ${found.size}`);

// Part two
let found2 = new Set();

for (let [key, spots] of towerLocations) {
    for (let i = 0; i < spots.length; i++) {
        for (let j = 0; j < spots.length; j++) {
            if (i === j) continue;

            let mul = 1;
            const dr = spots[i][0] - spots[j][0];
            const dc = spots[i][1] - spots[j][1];

            while (true) {
                const r = spots[j][0] + mul * dr;
                const c = spots[j][1] + mul * dc;

                if (r >= 0 && r < n && c >= 0 && c < m) {
                    found2.add(`${r},${c}`);
                } else {
                    break;
                }

                mul++;
            }
        }
    }
}

console.log(`The anwser to part two is: ${found2.size}`);
