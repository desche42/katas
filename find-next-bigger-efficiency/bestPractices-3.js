module.exports = function (n) {
    if (n === reverseSortDigits(n)) return -1
  
    let nSorted = sortDigits(n)
    
    while (true) {
      n += 1
      if (sortDigits(n) === nSorted) return n
    }
  }
  
  function splitDigits(d) {
    return String(d).split('')
  }
  
  function sortDigits(d) {
    return Number(splitDigits(d).sort().join(''))
  }
  
  function reverseSortDigits(d) {
    return Number(splitDigits(d).sort().reverse().join(''))
  }