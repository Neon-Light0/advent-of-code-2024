import fs from "fs";

// Part one
console.log("Calculating the answer for part one...");

const inputs = fs
    .readFileSync("./day13/input.txt", "utf8")
    .split("\n\r")
    .map((line) => {
        return line.trim().split("\n");
    })
    .map((commands) => {
        let match = commands[0].match(/(\d+)/g);
        const a = [Number(match[0]), Number(match[1])];

        match = commands[1].match(/(\d+)/g);
        const b = [Number(match[0]), Number(match[1])];

        match = commands[2].match(/(\d+)/g);
        const prize = [Number(match[0]), Number(match[1])];

        return { a, b, prize };
    });

function countTokens(inputs) {
    let tokens = 0;

    for (let input of inputs) {
        const a =
            (input.prize[0] * input.b[1] - input.b[0] * input.prize[1]) /
            (input.a[0] * input.b[1] - input.b[0] * input.a[1]);

        const b =
            (input.prize[0] * input.a[1] - input.a[0] * input.prize[1]) /
            (input.b[0] * input.a[1] - input.a[0] * input.b[1]);

        if (a === Math.floor(a) && b === Math.floor(b) && a >= 0 && b >= 0) {
            tokens += a * 3 + b;
        }
    }

    return tokens;
}

console.log(`The answer to part one is ${countTokens(inputs)}.`);

// Part two

console.log("Calculating the answer for part two...");

inputs.map((input) => {
    input.prize = [input.prize[0] + 10000000000000, input.prize[1] + 10000000000000];
});

//console.log(inputs);

console.log(`The answer to part two is ${countTokens(inputs)}.`);
