console.log("#8. JavaScript homework example file");

/*
 * #1
 *
 * Створення та додавання DOM-елемента
 */

function createDomElement(tagName, textContent, container) {
  const element = document.createElement(tagName);

  element.textContent = textContent;

  container.appendChild(element);

  return element;
}

// Демонстрація використання функції
const container = document.body;

console.log(
  createDomElement(
    "p",
    "This paragraph has been added to the specified container.",
    container,
  ),
);

/*
 * #2
 *
 * Встановлення cookie
 */

function setUserInfoCookie(key, value) {
  const encodedValue = encodeURIComponent(`${key}=${value}`);

  const expires = new Date(Date.now() + 10000).toUTCString();

  document.cookie = `userInfo=${encodedValue}; expires=${expires}; path=/`;

  console.log(`Cookie saved: ${key}=${value}`);
}

// Демонстрація використання функції
setUserInfoCookie("language", "en");

/*
 * #3
 *
 * Робота з sessionStorage
 */

function saveUserInfo(key, value) {
  sessionStorage.setItem(key, value);

  console.log(`Saved ${key}: ${value}`);
}

function getUserInfo(key) {
  const value = sessionStorage.getItem(key);

  console.log(`Retrieved ${key}: ${value}`);

  return value;
}

// Демонстрація використання функцій
saveUserInfo("username", "JohnDoe");

console.log(getUserInfo("username"));

export { createDomElement, setUserInfoCookie, saveUserInfo, getUserInfo };
