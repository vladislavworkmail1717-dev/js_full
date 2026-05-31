console.log("#6. JavaScript homework example file");

/*
 * #1
 * Задача: Калькулятор калорійності продуктів через клас.
 */

class CalorieCalculator {
  constructor() {
    this.products = new Map();
  }

  addProduct(productName, calories) {
    this.products.set(productName, calories);
  }

  getProductCalories(productName) {
    if (this.products.has(productName)) {
      return this.products.get(productName);
    }

    return "Product not found";
  }

  removeProduct(productName) {
    this.products.delete(productName);
  }
}

//Демонстрація використання
const calorieCalculator = new CalorieCalculator();
calorieCalculator.addProduct("Apple", 52);
calorieCalculator.addProduct("Banana", 89);
console.log(calorieCalculator.getProductCalories("Apple")); // 52
console.log(calorieCalculator.getProductCalories("Banana")); // 89

calorieCalculator.removeProduct("Apple");
console.log(calorieCalculator.getProductCalories("Apple")); // Product not found

/*
 * #2
 * Задача: Унікальні користувачі.
 */

class UniqueUsernames {
  constructor() {
    this.users = new Set();
  }

  addUser(username) {
    this.users.add(username);
  }

  exists(username) {
    return this.users.has(username);
  }

  count() {
    return this.users.size;
  }
}

// Демонстрація використання
const uniqueUsernames = new UniqueUsernames();
uniqueUsernames.addUser("john_doe");
uniqueUsernames.addUser("jane_doe");
uniqueUsernames.addUser("john_doe");

console.log(`Існує 'john_doe': ${uniqueUsernames.exists("john_doe")}`); // true
console.log(`Кількість унікальних імен: ${uniqueUsernames.count()}`); // 2

// Експорт для використання в тестах
export { CalorieCalculator, UniqueUsernames };
