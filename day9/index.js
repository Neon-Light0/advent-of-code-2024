import fs from "fs";

const input = fs.readFileSync("./day9/input.txt", "utf8").trim();

console.log("Calculating the answer for part one...");

let str = [];

for (let i = 0; i < input.length; i++) {
    let num = 0;

    if (i % 2) {
        num = ".";
    } else {
        num = i / 2;
    }

    for (let j = 0; j < Number(input[i]); j++) {
        str.push(num);
    }
}

let str1 = [...str];
let left = 0,
    right = str1.length - 1;

while (left < right) {
    if (str1[left] === ".") {
        if (str1[right] !== ".") {
            str1[left] = str1[right];
            str1[right] = ".";
            left++;
            right--;
        } else {
            right--;
        }
    } else {
        left++;
    }
}

let sum = 0;

for (let i = 0; i < str1.length; i++) {
    if (str1[i] === ".") break;

    sum += i * Number(str1[i]);
}

console.log(`The answer for part one is: ${sum}.`);

console.log("\nCalculating the answer for part two...");

const partition = [];

for (let i = 0; i < input.length; i++) {
    if (i % 2 === 1) {
        partition.push({ size: Number(input[i]), type: "free space" });
    } else {
        partition.push({ id: i / 2, size: Number(input[i]), type: "file" });
    }
}

for (let i = partition.length - 1; i >= 0; i--) {
    if (partition[i].type === "free space") {
        continue;
    }

    for (let j = 0; j < i; j++) {
        if (partition[j].type === "file") {
            continue;
        }

        if (partition[j].size === partition[i].size) {
            partition[j] = partition[i];
            partition[i] = { size: partition[j].size, type: "free space" };
            break;
        } else if (partition[j].size > partition[i].size) {
            const diff = partition[j].size - partition[i].size;

            partition[j] = partition[i];
            partition[i] = { size: partition[j].size, type: "free space" };
            partition.splice(j + 1, 0, { size: diff, type: "free space" });
            i++;
            break;
        }
    }
}

let index = 0;
let sum2 = 0;

for (let i = 0; i < partition.length; i++) {
    for (let j = 0; j < partition[i].size; j++) {
        if (partition[i].type === "file") {
            sum2 += index * partition[i].id;
        }

        index++;
    }
}

console.log(`The answer for part two is: ${sum2}.`);
