import fs from "fs";

let [wires, gates] = fs.readFileSync("./day24/input.txt", "utf8").split('\r\n\r\n');

wires = wires.split('\r\n');
gates = gates.split('\r\n');

const valLookup = new Map();

for (const wire of wires){
    const [name, value ] = wire.split(': ');
    valLookup.set(name, parseInt(value));
}

const opLookup = new Map();

for (const gate of gates){
    const [op, val] = gate.split(' -> ');
    op.trim();
    val.trim();
    opLookup.set(val, op.split(' '));
}

function getSum(a,b){
    const valLookup = structuredClone(a)
    const opLookup = structuredClone(b);

    function helper(val, level){
        if (valLookup.has(val)) {
            return valLookup.get(val);
        }
        
        const s = '  '.repeat(level); // 4 spaces per level

        console.log(s + val + ' = ' + opLookup.get(val));
        const op = opLookup.get(val)[1];
        const left = helper(opLookup.get(val)[0], level + 1);
        let value;

        switch (op){
            case 'XOR':
                value =  left ^ helper(opLookup.get(val)[2], level + 1);
                break;
            case 'OR':
                value = left | helper(opLookup.get(val)[2], level + 1);
                break;
            default:
                value =  left & helper(opLookup.get(val)[2], level + 1);
                break;
        }

        valLookup.set(val, value);
        return value;
    }

    for (let i = 0; i <= 45; i++){
        let val = 'z' + String(i).padStart(2, '0');
        console.log('------------------------');
        console.log(val);
        helper(val, 1);
    }

    const result = [...valLookup].filter(a => a[0][0] === 'z').toSorted((a, b) => b[0].localeCompare(a[0]));

    let final = 0n;
    
    for (const [s, bit] of result) {
        final = final << 1n;
        final += BigInt(bit);
    }

    return final;
}

console.log(`The result for part one is ${getSum(valLookup, opLookup)}.`);

// Part 2:

const x = [...valLookup].filter(a => a[0][0] === 'x').toSorted((a, b) => b[0].localeCompare(a[0]));
const y = [...valLookup].filter(a => a[0][0] === 'y').toSorted((a, b) => b[0].localeCompare(a[0]));
const z = [...valLookup].filter(a => a[0][0] === 'z').toSorted((a, b) => b[0].localeCompare(a[0]));
let xStr = '';
let yStr = '';

let valX = 0n;
let valY = 0n;

for (let i = 0; i < x.length; i++){
    valX = valX << 1n;
    valX += BigInt(x[i][1]);
    xStr += String(x[i][1]);
}

for (let i = 0; i < y.length; i++){
    valY = valY << 1n;
    valY += BigInt(y[i][1]);
    yStr += String(y[i][1]);
}

console.log(`x: ${valX}, y: ${valY}`);
console.log(`x binary: ${xStr}`);
console.log(`y binary: ${yStr}`);
const valZ = valX + valY;
console.log(`expected answer is ${valZ}.`);

const answer = ['z05', 'jst', 'z15', 'dnt', 'mcm', 'gdf', 'gwc', 'z30'];
console.log(answer.toSorted((a, b) => a.localeCompare(b)));

const finalAnswer = 'dnt,gdf,gwc,jst,mcm,z05,z15,z30';