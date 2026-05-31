/*
 * #1
 *
 * Розробити функцію, яка використовує метод reduce масиву
 * для обчислення суми усіх елементів масиву чисел.
 */

function sumArray(numbers) {
  return numbers.reduce((sum, number) => sum + number, 0);
}

// Використання функції
const exampleArray1 = [1, 2, 3, 4, 5];
const sum = sumArray(exampleArray1);

console.log("Сума елементів масиву:", sum);

/*
 * #2
 *
 * Розробити функцію, яка використовує метод map масиву
 * для створення нового масиву, в якому кожен елемент
 * буде вдвічі більшим.
 */

function doubleArrayElements(numbers) {
  return numbers.map((number) => number * 2);
}

// Використання функції
const exampleArray2 = [1, 2, 3, 4, 5];
const doubledArray = doubleArrayElements(exampleArray2);

console.log("Подвоєні елементи масиву:", doubledArray);

/*
 * #3
 *
 * SkillsManager
 */

class SkillsManager {
  constructor() {
    this.skills = [];
  }

  addSkill(skill) {
    if (typeof skill === "string" && skill.length >= 2) {
      this.skills.push(skill);
      return skill;
    }

    return null;
  }

  getAllSkills() {
    return this.skills;
  }
}

// Використання класу
const skillsManager = new SkillsManager();

console.log(skillsManager.addSkill("JavaScript"));
console.log(skillsManager.addSkill("CSS"));
console.log(skillsManager.getAllSkills());

/*
 * #4
 *
 * DateCalculator
 */

function DateCalculator(initialDate) {
  this.date = new Date(initialDate);

  this.addDays = function (days) {
    this.date.setDate(this.date.getDate() + days);
  };

  this.subtractDays = function (days) {
    this.date.setDate(this.date.getDate() - days);
  };

  this.getResult = function () {
    return this.date.toISOString().split("T")[0];
  };
}

// Демонстрація використання
const dateCalculator = new DateCalculator("2023-01-01");

dateCalculator.addDays(5);
console.log(dateCalculator.getResult());

dateCalculator.subtractDays(3);
console.log(dateCalculator.getResult());

export { doubleArrayElements, sumArray, SkillsManager, DateCalculator };
