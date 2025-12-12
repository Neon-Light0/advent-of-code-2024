import fs from 'fs'

const links = fs.readFileSync("./day23/input.txt", "utf-8").split(/\r?\n/).filter(line => line).map(line=>{return line.trim().split('-')})
const edgeMap = new Map();
let comps = new Set();

for (let i = 0; i < links.length; i++){
    comps.add(links[i][0]);
    comps.add(links[i][1]);

    if (edgeMap.has(links[i][0])){
        edgeMap.get(links[i][0]).add(links[i][1]);
    } else {
        const set = new Set();
        set.add(links[i][1])
        edgeMap.set(links[i][0], set);
    }

    if (edgeMap.has(links[i][1])){
        edgeMap.get(links[i][1]).add(links[i][0]);
    } else {
        const set = new Set();
        set.add(links[i][0]);
        edgeMap.set(links[i][1], set);
    }
}

const connections = new Set();
comps = [...comps].sort();

for (let i = 0; i < comps.length - 2; i++){
    for (let j = i + 1; j < comps.length - 1; j++){
        for (let k = j + 1; k < comps.length; k++){
            if (comps[i][0] === 't' || comps[j][0] === 't' || comps[k][0] === 't'){

                if (edgeMap.has(comps[i]) && edgeMap.get(comps[i]).has(comps[j]) && edgeMap.has(comps[j]) && edgeMap.get(comps[j]).has(comps[k]) && edgeMap.has(comps[k]) && edgeMap.get(comps[k]).has(comps[i])){
                    const entry = [comps[i], comps[j], comps[k]].sort();
                    connections.add(entry[0] + '-' + entry[1] + '-' + entry[2]);
                }
            }
        }
    }   
}

console.log(`The answer for part 1 is: ${[...connections].length}.`);

//Part 2
function findOthers(visitedComps, curComp){
    for (const connectedComp of edgeMap.get(curComp)){
        let isConnected = true;
        
        for (const comp of visitedComps){
            if (!edgeMap.get(connectedComp).has(comp)){
                isConnected = false;
                break;
            }
        }

        if (isConnected){
            visitedComps.add(connectedComp);
            findOthers(visitedComps, connectedComp)
        }
    }
}

let curMax = 0;
let solution;

for (const comp of comps){
    const set = new Set();
    findOthers(set, comp);
    if (set.size > curMax){
        curMax = set.size;
        solution = set;
    }
}

let answer = "";
const answerArr = [...solution].toSorted();

for (let i = 0; i < answerArr.length; i++){
    answer += answerArr[i];
    if (i != answerArr.length - 1){
        answer += ',';
    }
}

console.log(`The answer for part 2 is ${answer}.`);





