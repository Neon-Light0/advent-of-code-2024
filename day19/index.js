import fs from "fs";

console.log("Solving part one and part two...");

const [part1, part2] = fs.readFileSync("./day19/input.txt", "utf8").split("\n\r");
const patterns = part1.split(",").map((line) => line.trim());
const designs = part2
    .trim()
    .split("\n")
    .map((line) => line.trim());

function startsWith(s, prefix) {
    if (prefix.length > s.length) {
        return false;
    }

    for (let i = 0; i < prefix.length; i++) {
        if (s[i] !== prefix[i]) {
            return false;
        }
    }

    return true;
}

function canConstructString(design, patterns) {
    const found = new Map();
    const prevs = new Set();

    const canConstructStringHelper = (part, patterns) => {
        if (part.length === 0) {
            return 1;
        }

        if (found.has(part)) {
            return found.get(part);
        }

        let count = 0;

        for (const pattern of patterns) {
            if (startsWith(part, pattern)) {
                const nextPart = part.slice(pattern.length);
                count += canConstructStringHelper(nextPart, patterns);
            }
        }

        found.set(part, count);
        return count;
    };

    let count = canConstructStringHelper(design, patterns);
    const result = count > 0;

    return { found: result, count };
}

let count1 = 0;
let count2 = 0;

for (const design of designs) {
    const { found, count } = canConstructString(design, patterns);

    if (found) count1++;
    count2 += count;
}

console.log(`The answer to part 1 is ${count1}.`);
console.log(`The answer to part 1 is ${count2}.`);
