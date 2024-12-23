import fs from "fs";

// Part 1
console.log("Calculating the answer for day 5...");
console.time("Total execution time");
const [rules, pages] = fs.readFileSync("./day05/input.txt", "utf-8").split(/\n\s*\n/);
const rulesMap = new Map();

rules.split("\n").map((rule) => {
    const [key, value] = rule.trim().split("|");

    if (!rulesMap.has(key)) {
        rulesMap.set(key, new Set());
        rulesMap.get(key).add(value);
    } else {
        rulesMap.get(key).add(value);
    }
});

const updates = pages.split("\n").map((update) => {
    return update.trim().split(",");
});

let goodSum = 0;
let badSum = 0;

for (let i = 0; i < updates.length; i++) {
    let doBreak = false;

    for (let j = 0; j < updates[i].length; j++) {
        for (let k = j + 1; k < updates[i].length; k++) {
            if (!rulesMap.has(updates[i][j]) || !rulesMap.get(updates[i][j]).has(updates[i][k])) {
                doBreak = true;
                break;
            }
        }

        if (doBreak) break;
    }

    if (doBreak) {
        updates[i].sort((a, b) => {
            if (rulesMap.has(a) && rulesMap.get(a).has(b)) {
                return -1;
            }

            if (rulesMap.has(b) && rulesMap.get(b).has(a)) {
                return 1;
            }

            return 0;
        });

        badSum += Number(updates[i][Math.floor(updates[i].length / 2)]);
        continue;
    }
    goodSum += Number(updates[i][Math.floor(updates[i].length / 2)]);
}

console.timeEnd("Total execution time");
console.log(`\nThe answer for day 5 part 1 is: ${goodSum}.\n`);
console.log(`The answer for day 5 part 2 is: ${badSum}.\n`);
