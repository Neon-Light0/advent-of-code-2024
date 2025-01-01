import fs from "fs";

// Part one

console.log("Calculating part one...");

const [registerInput, programInput] = fs.readFileSync("./day17/input.txt", "utf8").split("\n\r");

let [A, B, C] = registerInput.split("\n").map((line) => {
    const match = line.match(/-?\d+/); // matches any integer including negative
    return parseInt(match[0]);
});

const instructions = programInput.substring(10);

function getComboOperand(operand) {
    if (operand >= 0 && operand <= 3) {
        return operand;
    } else if (operand === 4) {
        return A;
    } else if (operand === 5) {
        return B;
    } else if (operand === 6) {
        return C;
    } else {
        throw new Error("Invalid operand");
    }
}

function getProgram(instructionsStr) {
    let answer = "";
    const instructions = instructionsStr.split(",").map((str) => parseInt(str));

    for (let i = 0; i < instructions.length; i += 2) {
        const instruction = instructions[i];
        let operand = instructions[i + 1];

        switch (instruction) {
            case 0:
                operand = getComboOperand(operand);
                A = Math.floor(A / Math.pow(2, operand));
                break;
            case 1:
                B = (B ^ operand) >>> 0;
                break;
            case 2:
                operand = getComboOperand(operand);
                B = operand & 7;
                break;
            case 3:
                if (A !== 0) {
                    i = operand - 2;
                }
                break;
            case 4:
                B = (B ^ C) >>> 0;
                break;
            case 5:
                operand = getComboOperand(operand) & 7;
                answer += answer.length > 0 ? "," : "";
                answer += operand.toString();
                break;
            case 6:
                operand = getComboOperand(operand);
                B = Math.floor(A / Math.pow(2, operand));
                break;
            case 7:
                operand = getComboOperand(operand);
                C = Math.floor(A / Math.pow(2, operand));
                break;
        }
    }

    return answer;
}

console.log(`The answer to part one is ${getProgram(instructions)}.`);

// Part two

console.log("Calculating part two...");

let i =
    Math.pow(8, 15) * 6 + // 6
    Math.pow(8, 14) * 1 + // 1, 5
    Math.pow(8, 13) * 1 + // 1, 5, 6
    Math.pow(8, 12) * 1 + // 1, 7
    Math.pow(8, 11) * 2 + // 1, 2,
    Math.pow(8, 10) * 7 + // 5
    Math.pow(8, 9) * 6 + // 1
    Math.pow(8, 8) * 4 + // 2
    Math.pow(8, 7) * 5 + // 1, 7
    //Math.pow(8, 6) * 4 +
    //Math.pow(8, 5) * 2 +
    //Math.pow(8, 4) * 4 +
    //Math.pow(8, 3) * 3 +
    //Math.pow(8, 2) * 1 +
    0;

while (true) {
    A = i;
    B = 0;
    C = 0;

    //console.log(instructions);
    //console.log(`${getProgram(instructions)}\n`);
    let pstr = getProgram(instructions);

    //console.log(pstr, instructions, i, pstr === instructions);

    if (pstr === instructions) {
        console.log(`The answer to part two is ${i}.`);
        break;
    }

    i += 1;
}
