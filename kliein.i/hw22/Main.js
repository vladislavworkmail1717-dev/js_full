 console.log('#5. JavaScript homework example file')

/*
 * #1
 *
 * Створіть функцію counter(), яка має реалізувати лічильник за допомогою замикання:
 * функція може приймати число як аргумент counter(n)
 * якщо число передано у функцію - лічба починається із зазначеного числа
 * якщо ні - то лічба триває
 */
function counter() {
  let count = 0

  return function (n) { 
    if (n !== undefined) {
        count = n
    } else {
        count++
    }
    return count
    }   
}
const count = counter()

console.log(count()) // 0
console.log(count()) // 1
console.log(count(100)) // 100
console.log(count()) // 101
console.log(count()) // 102
console.log(count(500)) // 500
console.log(count()) // 501
console.log(count()) // 502
console.log(count(0)) // 0
console.log(count()) // 0
console.log(count()) // 1





// const counter = function() {}

// console.log(counter()) // 0
// console.log(counter()) // 1
// console.log(counter(100)) // 100
// console.log(counter()) // 101
// console.log(counter()) // 102
// console.log(counter(500)) // 500
// console.log(counter()) // 501
// console.log(counter()) // 502
// console.log(counter(0)) // 0
// console.log(counter()) // 0
// console.log(counter()) // 1

/*
 * #2
 *
 * Створіть функцію counterFactory, яка має реалізувати три методи за допомогою замикання:
 * початкове значення лічильника - 0
 * counterFactory.value() - повертає значення лічильника
 * counterFactory.value(n) - встановлює значення лічильника, повертає нове значення
 * counterFactory.increment() - збільшує значення лічильника на 1
 * counterFactory.decrement() - зменшує значення лічильника на 1
 */
function counterFactory() {
    let count = 0
    return {
        value: function (n) {
            if (n !== undefined) {
                count = n
            }
            return count
        }
        ,
        increment: function () {
            count++
        }
        ,
        decrement: function () {
            count--
        }
    }
}

const counterF = counterFactory()
console.log(counterF.value()) // 0
counterF.increment()
counterF.increment()
counterF.increment()
console.log(counterF.value()) // 3
counterF.decrement()
counterF.decrement()
console.log(counterF.value()) // 1
console.log(counterF.value(100)) // 100
counterF.decrement()
console.log(counterF.value()) // 99
console.log(counterF.value(200)) // 200
counterF.increment()
console.log(counterF.value()) // 201    






// const counterFactory = function () {}

// console.log(counterFactory.value()) // 0
// counterFactory.increment()
// counterFactory.increment()
// counterFactory.increment()
// console.log(counterFactory.value()) // 3
// counterFactory.decrement()
// counterFactory.decrement()
// console.log(counterFactory.value()) // 1
// console.log(counterFactory.value(100)) // 100
// counterFactory.decrement()
// console.log(counterFactory.value()) // 99
// console.log(counterFactory.value(200)) // 200
// counterFactory.increment()
// console.log(counterFactory.value()) // 201

/*
 * #3
 *
 * Створіть функцію myPow(a, b, myPrint). Всередині реалізуйте рекурсію для підрахунку результату піднесення числа a до ступеня b.
 * - Функція myPrint(a, b, res) - глобальна функція, що має генерувати з параметрів a, b, res рядок вигляду 'a^b=res' і повертати його.
 * - myPrint() має бути передана в myPow() як параметр і викликана всередині як callback-функція.
 * - функція myPow() як значення, що повертається, приймає результат myPrint().
 * Наприклад:
 * console.log(myPow(3, 4, myPrint)); // 3^4=81
 * console.log(myPow(2, 3, myPrint)); // 2^3=8
 * console.log(myPow(2, 0, myPrint))  // 2^0=1
 * console.log(myPow(2, -2, myPrint)) // 2^-2=0.25
 */
function myPow(a, b, myPrint) {
    let res = 1
    if (b > 0) {
        res = a * myPow(a, b - 1, myPrint) 
    } else if (b < 0) {
        res = 1 / (a * myPow(a, -b - 1, myPrint))
    }   
    return myPrint(a, b, res)
}
function myPrint(a, b, res) {
    return `${a}^${b}=${res}`
}
const myPowResult1 = myPow(3, 4, myPrint)
const myPowResult2 = myPow(2, 3, myPrint)
const myPowResult3 = myPow(2, 0, myPrint)
const myPowResult4 = myPow(2, -2, myPrint)

console.log(myPowResult1); // 3^4=81
console.log(myPowResult2); // 2^3=8
console.log(myPowResult3);  // 2^0=1
console.log(myPowResult4); // 2^-2=0.25 


// const myPrint = () => {}
// const myPow = () => {}

// console.log(myPow(3, 4, myPrint)) // 3^4=81
// console.log(myPow(2, 3, myPrint)) // 2^3=8
// console.log(myPow(2, 0, myPrint)) // 2^0=1
// console.log(myPow(2, -2, myPrint)) // 2^-2=0.25


/*
 * #4
 * Створіть функцію myMax(arr), яка як параметр приймає
 * довільний числовий масив і повертає максимальне число з переданого їй масиву.
 * У реалізації функції має бути застосовано метод Math.max() і apply().
 */

// const list = [12, 23, 100, 34, 56, 9, 233]
// const myMax = () => {}

// console.log(myMax(list)); // 233
function myMax(arr) {
    return Math.max.apply(null, arr)
}
const list = [12, 23, 100, 34, 56, 9, 233]
const max = myMax(list)
console.log(max); // 233    
const list2 = [1, 5, 3, 9, 2]
const max2 = myMax(list2)
console.log(max2); // 9
const list3 = [-10, -5, -3, -1, -2]
const max3 = myMax(list3)
console.log(max3); // -1
const list4 = [0, 0, 0, 0]
const max4 = myMax(list4)
console.log(max4); // 0

/*
 * #5
 *
 * Створіть функцію myMul(a, b), яка буде множити числа а і b, повертаючи результат.
 */

// const myMul = () => {}
function myMul(a, b) {
    return a * b
}
const mul1 = myMul(2, 3)
const mul2 = myMul(4, 5)
const mul3 = myMul(6, 7)
console.log(mul1); // 6
console.log(mul2); // 20
console.log(mul3); // 42

/*
 * Створіть функції myDouble(n), яка приймає один параметр і подвоює його.
 * Використовувати множення або інші математичні операції всередині функції - заборонено, тільки bind() і myMul().
 * Функція повертає результат обчислення.
 */

// const myDouble = myMul.bind(null, 2)
const myDouble = myMul.bind(null, 2)   
console.log(myDouble(3)) // = myMul(2, 3) = 6
console.log(myDouble(4)) // = myMul(2, 4) = 8
console.log(myDouble(5)) // = myMul(2, 5) = 10

// console.log(myDouble(3)) // = myMul(2, 3) = 6
// console.log(myDouble(4)) // = myMul(2, 4) = 8
// console.log(myDouble(5)) // = myMul(2, 5) = 10

// Аналогічним чином створюємо функцію myTriple(n), яка потроює параметр, що приймає, повертаючи результат.

// const myTriple
const myTriple = myMul.bind(null, 3)
console.log(myTriple(3)) // = myMul(3, 3) = 9
console.log(myTriple(4)) // = myMul(3, 4) = 12
console.log(myTriple(5)) // = myMul(3, 5) = 15                  

// console.log(myTriple(3)) // = myMul(3, 3) = 9
// console.log(myTriple(4)) // = myMul(3, 4) = 12
// console.log(myTriple(5)) // = myMul(3, 5) = 15

export { counter, counterFactory, myPow, myMax, myMul, myDouble, myTriple }
