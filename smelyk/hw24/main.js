/*
 * #1
 *
 * Розробити функцію, яка використовує метод reduce масиву для обчислення суми усіх елементів 
 * масиву чисел.
 Функція повинна приймати масив чисел та повертати їх суму.
*/

console.log("Exercise 1:");

function sumArray(numbers) {
  return numbers.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
  );
}

// Використання функції
const exampleArray = [1, 2, 3, 4, 5];
const sum = sumArray(exampleArray);
console.log("Сума елементів масиву:", sum); // Виведення суми

console.log("**************************");

/*
 * #2
 *
 * Розробити функцію, яка використовує метод map масиву для створення нового масиву,
 * в якому кожен елемент буде вдвічі більшим за елементи вхідного масиву чисел.
 */

console.log("Exercise 2:");
function doubleArrayElements(numbers) {
  return numbers.map((num) => num * 2);
}

// Використання функції
const exampleArray2 = [1, 2, 3, 4, 5];
const doubledArray = doubleArrayElements(exampleArray2);
console.log("Подвоєні елементи масиву:", doubledArray); // Виведення подвоєних елементів

console.log("**************************");

/*
 * #3
 *
 * Розробити клас `SkillsManager`, що відповідає за управління списком навичок. Клас повинен
 * включати:
 * 1. Конструктор:
 * - Ініціалізує порожній масив `skills`, який буде використовуватися для зберігання навичок.
 * 2. Метод `addSkill(skill)`:
 * - Приймає один аргумент `skill` (рядок).
 * - Перевіряє, чи аргумент є рядком і має мінімум два символи.
 * - Якщо умови виконані, додає `skill` до масиву `skills` і повертає додану навичку.
 * - Якщо умови не виконані (навичка не є рядком або має менше двох символів), повертає `null`.
 * 3. Метод `getAllSkills()`:
 *   - Повертає поточний масив усіх навичок, збережених у класі.
 *
 * Загальні вимоги:
 * - Клас має бути модульним і здатним до використання в інших частинах програми, тому він
 * повинен бути експортований.
 * - Клас має забезпечувати легке управління навичками, включаючи додавання нових навичок
 * та отримання списку всіх наявних навичок.
 * - Код має бути написаний з урахуванням принципів чистого коду, забезпечуючи читабельність
 * та легкість підтримки.
 */

console.log("Exercise 3:");

class SkillsManager {
  constructor() {
    this.skills = new Array();
  }

  addSkill(skill) {
    if (typeof skill === "string" && skill.length > 2) {
      this.skills.push(skill);
      return this.skills[this.skills.length - 1];
    }
    return null;
  }

  getAllSkills() {
    return this.skills;
  }
}

const skillsManager = new SkillsManager();
//
console.log(skillsManager.addSkill("JavaScript"));
console.log(skillsManager.addSkill("CSS"));
console.log(skillsManager.getAllSkills());

console.log("**************************");

/*
 * #4
 * Задача: Калькулятор дат.
 * Завдання: Створити модуль на JavaScript, який імплементує функцію-конструктор
 * DateCalculator для створення об'єктів, здатних керувати датами. Калькулятор дат має
 * надавати такі можливості:
 *
 * Додавання днів: Метод addDays приймає кількість днів як аргумент і додає цю кількість
 * до поточної дати об'єкта.
 *
 * Віднімання днів: Метод subtractDays приймає кількість днів як аргумент і віднімає цю
 * кількість від поточної дати об'єкта.
 *
 * Отримання результату: Метод getResult повертає поточну дату об'єкта у форматі "YYYY-MM-DD".
 *
 * Критерії перевірки:
 * В модулі має бути визначена функція-конструктор DateCalculator, яка ініціалізує об'єкт
 * з початковою датою.
 * Мають бути реалізовані та доступні методи addDays, subtractDays, та getResult
 * для екземплярів DateCalculator.
 * Об'єкти DateCalculator мають створюватися за допомогою ключового слова new і
 * використання функції-конструктора.
 */

console.log("Exercise 4:");

function DateCalculator(initialDate) {
  this.date = new Date(initialDate);

  this.addDays = function (days) {
    this.date.setDate(this.date.getDate() + days);
  };

  this.subtractDays = function (days) {
    this.date.setDate(this.date.getDate() - days);
  };

  this.getResult = function () {
    return this.date.toISOString().slice(0, 10);
  };
}

// Демонстрація використання
const dateCalculator = new DateCalculator("2023-01-01");
dateCalculator.addDays(5);
console.log(dateCalculator.getResult()); // Виводить нову дату після додавання днів
//
dateCalculator.subtractDays(3);
console.log(dateCalculator.getResult()); // Виводить нову дату після віднімання днів

// export { doubleArrayElements, sumArray, SkillsManager, DateCalculator }
