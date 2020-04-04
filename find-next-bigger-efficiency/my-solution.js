module.exports = function mySolution(n) {
    const numbers = String(n).split('').map(Number);
    const max = numbers.length;
    
    let result = -1;
    
    if (max < 2) return result;
    
    // try last two
    let start = 2;
    
    while(start <= max) {
        let [first, ...rest] = numbers.slice(-start);
        rest = rest.sort();
        const lowestGtFirst = rest.find(i => i > first);
        if (lowestGtFirst) {
        rest.splice(rest.indexOf(lowestGtFirst), 1, first);
        result = numbers.slice(0, -start).concat([lowestGtFirst, ...rest.sort()]);
        result = Number(result.join(''));
        break;
        } else start++;
    }
    
    return result;
}