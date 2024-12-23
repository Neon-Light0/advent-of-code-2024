import fs from "fs";

const input = fs.readFileSync("./day11/input.txt", "utf-8").split(" ").map(Number);

function countStone(nBlinks, stones) {
    let numMap = new Map();

    for (let stone of stones) {
        if (numMap.has(stone)) {
            numMap.set(stone, numMap.get(stone) + 1);
        } else {
            numMap.set(stone, 1);
        }
    }

    for (let i = 0; i < nBlinks; i++) {
        let tempMap = new Map();

        for (let [num, count] of numMap) {
            if (num === 0) {
                if (tempMap.has(1)) {
                    tempMap.set(1, tempMap.get(1) + count);
                } else {
                    tempMap.set(1, count);
                }
            } else if (String(num).length % 2 === 0) {
                const numStr = String(num);
                const mid = numStr.length / 2;
                const left = Number(numStr.slice(0, mid));
                const right = Number(numStr.slice(mid));

                if (tempMap.has(left)) {
                    tempMap.set(left, tempMap.get(left) + count);
                } else {
                    tempMap.set(left, count);
                }

                if (tempMap.has(right)) {
                    tempMap.set(right, tempMap.get(right) + count);
                } else {
                    tempMap.set(right, count);
                }
            } else {
                let newNum = num * 2024;
                if (tempMap.has(newNum)) {
                    tempMap.set(newNum, tempMap.get(newNum) + count);
                } else {
                    tempMap.set(newNum, count);
                }
            }
        }

        numMap = tempMap;
    }

    let sum = 0;

    for (let [num, count] of numMap) {
        sum += count;
    }

    return sum;
}

// Part 1
console.log("Calculating part one...");
console.log(`The answer for part one is ${countStone(25, input)}.`);

console.log("Calculating part two...");
console.log(`The answer for part two is ${countStone(75, input)}.`);
