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
    const valLookup2 = structuredClone(a)
    const opLookup = structuredClone(b);

    function helper(val){
        if (valLookup2.has(val)) return valLookup2.get(val);

        const left = helper(opLookup.get(val)[0]);
        const right = helper(opLookup.get(val)[2]);
        const op = opLookup.get(val)[1];

        switch (op){
            case 'XOR':
                return left ^ right;
            case 'OR':
                return left | right;
            default:
                return left & right;
        }
    }

    for (const [val, _] of opLookup){
        if (valLookup2.has(val)) continue;
        
        valLookup2.set(val, helper(val));
    }

    const result = [...valLookup2].filter(a => a[0][0] === 'z').toSorted((a, b) => b[0].localeCompare(a[0]));

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

for (let i = 0; i < gates.length; i++){
    for (let j = i+1; j < gates.length; j++){
        for (let k = 0; k < gates.length; k++){
            for (let l = k; l < gates.length; l++){
                // disallow overlaps (no shared indices)
                if (i == k || i == l || j == k || j == l)
                    continue;

                // avoid duplicates by ordering the pairs
                if (k < j)  
                    continue;
                
                const newGates = structuredClone(gates);
                const temp1 = newGates[i];
                const temp2 = newGates[j];
                const temp3 = newGates[k];
                const temp4 = newGates[l];

                newGates[i] = temp1.split(' -> ')[0] + ' -> ' + temp2.split(' -> ')[1];
                newGates[j] = temp2.split(' -> ')[0] + ' -> ' + temp1.split(' -> ')[1];
                newGates[k] = temp3.split(' -> ')[0] + ' -> ' + temp4.split(' -> ')[1];
                newGates[l] = temp4.split(' -> ')[0] + ' -> ' + temp3.split(' -> ')[1];

                const opLookup2 = new Map();

                for (const gate of newGates){
                    const [op, val] = gate.split(' -> ');
                    op.trim();
                    val.trim();
                    opLookup2.set(val, op.split(' '));
                }

                if (getSum(valLookup, opLookup2) === valZ){
                    console.log(`${i},${j},${k},${l}`);
                }
            }
        }
    }
}