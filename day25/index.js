import fs from "fs";

const lines = fs.readFileSync("./day25/input.txt", "utf8").split("\n").map((line) => line.trim());

const schematics = new Array();
const keys = new Array();
const locks = new Array();

let schematic = new Array();

for (const line of lines){    
    if (line){
        schematic.push(line);
    } else {
        schematics.push(schematic);
        schematic = new Array();
    }
}

if (schematic.length){
    schematics.push(schematic);
}

//console.table(schematics);

for (const schematic of schematics){
    const isLock = schematic[0][0] === '#';
    const nums = Array(schematic[0].length).fill(0);

    for (let i = 1; i < schematic.length - 1; i++){
        for (let j = 0; j < schematic[i].length; j++){
            const identifier = isLock ? '#' : '.';

            if (schematic[i][j] === identifier){
                nums[j] += 1;
            }
        }
    }

    if (isLock){
        locks.push(nums);
    } else {
        keys.push(nums);
    }
}

// console.log('locks');
// console.table(locks);
// console.log('keys')
// console.table(keys);

let count = 0;

for (let lock of locks){
    for (let key of keys){
        if (lock.length !== key.length) continue;
        let doesFit = true;

        for (let i = 0; i < lock.length; i++){
            if (lock[i] > key[i]){
                doesFit = false;
                break;
            }
        }

        if (doesFit){
            count += 1;
        }
    }
}

console.log(`The answer for part one is: ${count}.`);
