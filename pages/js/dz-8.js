"use strict";

// Відкриває нове вікно браузера з URL-адресою Google
window.open('https://www.google.com', '_blank');

// Встановлює таймер, який виводить повідомлення через 2 секунди
window.setTimeout(function() {
//   alert('Привіт через 2 секунди!');
  console.log('Повідомлення виведено через 2 секунди');
}, 2000);

// Отримує ширину та висоту вікна браузера
const width = window.innerWidth;
const height = window.innerHeight;
console.log(`Розміри вікна: ширина - ${width}, висота - ${height}`);
console.log('Об\'єкт window: ', window); // Виводить об'єкт window в консоль

// Зберігаємо дані в локальному сховищі
// window.localStorage.setItem('js_full', JSON.stringify({'1': 'lesson22'}));
// Отримуємо дані з локального сховища
const value = window.localStorage.getItem('js_full');
console.log(JSON.parse(value)); // Виводить 'значення'

// Перенаправляє користувача на іншу сторінку
// window.location.href = 'https://www.example.com';

// Отримання розмірів екрану користувача
const screenWidth = screen.width;
const screenHeight = screen.height;

console.log(`Ширина екрану: ${screenWidth}px, Висота екрану: ${screenHeight}px`);

// Визначення максимально можливої кількості кольорів, які може відображати екран
const colorDepth = screen.colorDepth;
console.log(`Глибина кольору: ${colorDepth} біт`);
console.log('screen: ', screen);


// Отримання інформації про браузер користувача
const browserName = navigator.appName;
const browserVersion = navigator.appVersion;

console.log(`Браузер: ${browserName}, Версія: ${browserVersion}`);

console.log('navigator: ', navigator);

// Визначення чи користувач використовує режим інкогніто
function detectIncognito() {
  const fs = window.RequestFileSystem || window.webkitRequestFileSystem;
  if (!fs) {
    console.log("Не можливо визначити");
    return false;
  } else {
    fs(window.TEMPORARY,
      100,
      () => console.log("Не в режимі інкогніто"),
      () => console.log("В режимі інкогніто"));
  }
}

detectIncognito();

// Повертає користувача на одну сторінку назад
// history.back();

// Переміщує користувача на одну сторінку вперед, якщо він раніше перейшов назад
// history.forward();

// Переміщує користувача на дві сторінки назад у історії
// history.go(-2);

// Додає новий запис до історії сесії без перезавантаження сторінки
console.log('history1: ', history);
// history.pushState({ page: 1 }, "title 1", "?page=1");
// Замінює поточний запис у історії на новий
// history.replaceState({ page: 2 }, "title 2", "?page=2");
console.log('history2: ', history);

// Отримання повного URL поточної сторінки
const currentUrl = window.location.href;
console.log(`Поточний URL: ${currentUrl}`);
console.log('location: ', location);

// Зміна шляху на поточній сторінці (без перезавантаження)
// window.location.pathname = '/new-path';

// Додавання параметрів до URL
// window.location.search = '?query=новий_запит';

// Перенаправлення на нову сторінку
// window.location.href = 'https://example.com';

// Перезавантаження поточної сторінки
// window.location.reload();

// error
fetch('https://api.example.com/data')
  .then(response => {
    // Перевірка, чи відповідь від сервера була успішною
    if (!response.ok) {
      throw new Error('Мережева відповідь була не успішною');
    }
    // Парсинг відповіді як JSON
    return response.json();
  })
  .then(data => {
    // Обробка отриманих даних
    console.log(data);
  })
  .catch(error => {
    // Обробка помилок мережі або помилки парсингу
    console.error('Виникла проблема з вашим fetch запитом:', error);
  });


  //all ok
  fetch('https://fake-json-api.mock.beeceptor.com/users')
  .then(response => {
    // Перевірка, чи відповідь від сервера була успішною
    if (!response.ok) {
      throw new Error('Мережева відповідь була не успішною');
    }
    // Парсинг відповіді як JSON
    return response.json();
  })
  .then(data => {
    // Обробка отриманих даних
    console.log(data);
  })
  .catch(error => {
    // Обробка помилок мережі або помилки парсингу
    console.error('Виникла проблема з вашим fetch запитом:', error);
  });

  // Збереження cookie
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

// Отримання cookie
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Встановлення cookie
setCookie('user', 'John Doe', 7);

// Отримання значення cookie
let user = getCookie('user');
console.log('Користувач:', user);

console.log('document.cookie: ', document.cookie); // Виводить всі cookie в консоль

// Зберігання пари ключ-значення
localStorage.setItem('user', 'John Doe');

// Отримання значення за ключем
 user = localStorage.getItem('user');
console.log('Збережений користувач:', user);

// Видалення збереженого значення за ключем
localStorage.removeItem('user');

// Зберігання пари ключ-значення
sessionStorage.setItem('sessionData', 'Тимчасові дані');

// Отримання значення за ключем
const sessionData = sessionStorage.getItem('sessionData');
console.log('Збережені тимчасові дані:', sessionData);

// Видалення збереженого значення за ключем
sessionStorage.removeItem('sessionData');


// Використання alert
// alert('Привіт, світ!');

// Використання confirm
// const isConfirmed = confirm('Ви впевнені, що хочете продовжити?');
// console.log(isConfirmed); // Виведе true, якщо користувач натисне OK, і false - якщо Cancel.

// Використання prompt
// const userName = prompt('Як вас звати?', 'Анонім');
// console.log(userName); // Виведе текст, введений користувачем, або "Анонім" якщо користувач відразу натисне OK, або null, якщо натисне Cancel.

// Встановлення таймера, який виконує функцію через 2000 мілісекунд (2 секунди)
// setTimeout(function() {
//   prompt('Як вас звати?', 'Анонім');
// }, 2000);

// Встановлення інтервального таймера, який виводить повідомлення кожні 1000 мілісекунд (1 секунду)
// const intervalId = setInterval(function() {
//   console.log('Це повідомлення з\'являтиметься кожну секунду');
// }, 1000);

// // Зупинка інтервального таймера через 5 секунд
// setTimeout(function() {
//   clearInterval(intervalId);
//   console.log('Інтервал зупинено');
// }, 5000);

let element = document.getElementById('unique-id');
console.log('Element with unique ID:', element); // Виводить елемент з унікальним ID в консоль

let elements = document.getElementsByClassName('unique-id-class');
console.log('Elements with class "unique-id-class":', elements); // Виводить елементи з класом "unique-id-class" в консоль

const elements1 = document.getElementsByTagName('div');
console.log('Elements with tag "div":', elements1); // Виводить елементи з тегом "div" в консоль

const elements3 = document.getElementsByName('name-attribute');
console.log('Elements with name "name-attribute":', elements3); // Виводить елементи з атрибутом name="name-attribute" в консоль

// const element = document.querySelector('.class #id');
// const elements = document.querySelectorAll('div.class');

const attributeValue = element.getAttribute('class');
console.log('Значення атрибута class:', attributeValue); // Виводить значення атрибута class в консоль

element.setAttribute('href', 'https://example.com');

element.className = 'new-class-name';

element.classList.add('new-class');
element.classList.remove('old-class');
element.classList.toggle('toggle-class');
element.classList.contains('some-class'); // повертає true або false

const child = document.getElementById('child-id');
element.removeChild(child);

let newElement = document.createElement('div');
element.appendChild(newElement);

 newElement = document.createElement('div');
element.insertBefore(newElement, element.firstChild); // Вставити перед першим дочірнім елементом

 newElement = document.createElement('div');
const oldElement = document.getElementById('old-id');
element.replaceChild(newElement, oldElement);

const clone = element.cloneNode(true); // якщо true, клонується з усіма дочірніми елементами