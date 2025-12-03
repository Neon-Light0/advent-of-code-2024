import fs from 'fs'

const nums = fs.readFileSync("./day22/input.txt", "utf-8").split('\r\n').map(l=>{
   return  [BigInt(l.trim())]});

function getNextSecretNumber(secretNum){
    let num = secretNum * 64n;
    secretNum = num ^ secretNum;
    secretNum = secretNum % 16777216n;

    num = secretNum / 32n;
    secretNum = num ^ secretNum;
    secretNum = secretNum % 16777216n;

    num = secretNum * 2048n;
    secretNum = num ^ secretNum;
    secretNum = secretNum % 16777216n;

    return secretNum;
}

for (let i = 0; i < 2000; i++){
    for (const num of nums){
        num.push(getNextSecretNumber(num[num.length - 1]));
    }
}

let sum = 0n;

for (const num of nums){
    sum += num[2000]
}

console.log(`The answer for part 1 is: ${sum}.`);

for (let i = 0; i < nums.length; i++) {
    nums[i] = nums[i].map(n => Number(n % 10n));
}

const map = new Map();

for (let i = 0; i < nums.length; i++){
    for (let j = 4; j < nums[i].length; j++){
        const diff1 = nums[i][j - 3] - nums[i][j - 4];
        const diff2 = nums[i][j - 2] - nums[i][j - 3];
        const diff3 = nums[i][j - 1] - nums[i][j - 2];
        const diff4 = nums[i][j] - nums[i][j - 1];
        const key = `${diff1},${diff2},${diff3},${diff4}`;

        if (map.has(key) ){
            if (map.get(key)[i] === 0){
                map.get(key)[i] = nums[i][j];
            }
        } else {
            map.set(key, Array(nums.length).fill(0));
            map.get(key)[i] = nums[i][j];
        }
    }
}

let answer = '';
let curMax = 0;

for (let [key, val] of map){
    let sum = 0;

    for (let v of val){
        sum += v;
    }

    if (sum > curMax){
        curMax = sum;
        answer = key;
    }
}

console.log(`The sequence for part 2 is ${answer}.`);
console.log(`The answer for part 2 is ${curMax}.`);
