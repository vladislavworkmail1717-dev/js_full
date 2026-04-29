console.log('JS #1. Домашнє завдання. Основи JavaScript: Працюємо зі змінними, типами даних');

/*
 * #1
 */
let myNum = 10;
let myStr = 'some string';
let myBool = true;
const myArr = [1, 2, 3, 4, 5];
const myObj = {
    first: 'First Name',
    last: 'Last Name'
};

console.log({myNum}); 
console.log({myStr});
console.log({myBool});
console.log({myArr});
console.log({myObj});

/*
 * #2
 */
const decimal2 = myNum.toFixed(2);
const decimal3 = myNum.toFixed(3);
const decimal4 = myNum.toFixed(4);

console.log(decimal4); // "10.0000"
console.log(decimal3); // "10.000"
console.log(decimal2); // "10.00"

/*
 * #3
 */
let myBigInt = 123n;
console.log(myBigInt); // 123n

myBigInt += 1n; 
console.log(myBigInt); // 124n
