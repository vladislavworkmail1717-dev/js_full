console.log('JS #2. Домашнє завдання.');

function greetByName(msg, name) {
  var fullgreet = msg + ', ' + name;

  return fullgreet;
}

console.log(greetByName('Hi', 'Yana'));

function sumBigIntegers(numStr1, numStr2) {
  BigInt(numStr1) + BigInt(numStr2);
  let result = BigInt(numStr1) + BigInt(numStr2);
  return result;
}

console.log(sumBigIntegers('9007199254740991', '9007199254740991'));

function getRandomInt(min, max) {
    var randomNumber = Math.floor(Math.random() * (max - min + 1) + min);


    return randomNumber;
}
console.log(getRandomInt(1, 10));
console.log(getRandomInt(40, 50));
console.log(getRandomInt(1, 100)); 
