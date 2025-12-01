import fs from 'fs'

const links = fs.readFileSync("./day23/input.txt", "utf-8").split('\r\n').map(line=>{return line.split('-')})
const edgeMap = new Map();
let comps = new Set();

for (let i = 0; i < links.length; i++){
    comps.add(links[i][0]);
    comps.add(links[i][1]);

    if (edgeMap.has(links[i][0])){
        edgeMap.get(links[i][0]).push(links[i][1]);
    } else {
        const arr = new Array();
        arr.push(links[i][1]);
        edgeMap.set(links[i][0], arr);
    }

    if (edgeMap.has(links[i][1])){
        edgeMap.get(links[i][1]).push(links[i][0]);
    } else {
        const arr = new Array();
        arr.push(links[i][0]);
        edgeMap.set(links[i][1], arr);
    }
}

const connections = new Set();
const visited = new Set();
comps = [...comps].sort();

for (let i = 0; i < comps.length - 2; i++){
    for (let j = i + 1; j < comps.length - 1; j++){
        for (let k = j + 1; k < comps.length; k++){
            if (comps[i][0] === 't' || comps[j][0] === 't' || comps[k][0] === 't'){

                if (edgeMap.has(comps[i]) && edgeMap.get(comps[i]).includes(comps[j]) && edgeMap.has(comps[j]) && edgeMap.get(comps[j]).includes(comps[k]) && edgeMap.has(comps[k]) && edgeMap.get(comps[k]).includes(comps[i])){
                    const entry = [comps[i], comps[j], comps[k]].sort();
                    connections.add(entry[0] + '-' + entry[1] + '-' + entry[2]);
                }
            }
        }
    }   
}

console.table([...connections].length);
