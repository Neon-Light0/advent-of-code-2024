import fs from "fs";

const equations = fs.readFileSync("./day07/input.txt", "utf-8").split("\n");
const values = equations.map((equation) => {
    const [lhs, rhs] = equation.split(":");
    return lhs;
});

const numbers = equations.map((equation) => {
    return equation.split(":")[1].trim().split(" ");
});

let sum = 0;

for (let i = 0; i < values.length; i++) {
    const expected = Number(values[i]);
    const nOps = numbers[i].length - 1;
    const p = Math.pow(2, nOps);

    for (let j = 0; j < p; j++) {
        let calculated = Number(numbers[i][0]);

        for (let k = 0; k < nOps; k++) {
            if (1 & (j >> k)) {
                calculated += Number(numbers[i][k + 1]);
            } else {
                calculated *= Number(numbers[i][k + 1]);
            }
        }

        if (calculated === expected) {
            sum += expected;
            break;
        }
    }
}

let as = new Set();

console.log(`The anwer to part one is ${sum}.`);

sum = 0;

for (let i = 0; i < values.length; i++) {
    const expected = Number(values[i]);
    const nOps = numbers[i].length - 1;
    const p = Math.pow(3, nOps);

    for (let j = 0; j < p; j++) {
        let calculated = Number(numbers[i][0]);

        for (let k = 0; k < nOps; k++) {
            const op = Math.floor(j / Math.pow(3, k)) % 3;

            if (op == 0) {
                calculated += Number(numbers[i][k + 1]);
            } else if (op == 1) {
                calculated *= Number(numbers[i][k + 1]);
            } else {
                calculated = Number(String(calculated).concat(numbers[i][k + 1]));
            }
        }

        if (calculated === expected) {
            sum += expected;
            break;
        }
    }
}

console.log(`The anwer to part two is ${sum}.`);
