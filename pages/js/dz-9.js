"use strict";
// Отримуємо доступ до елементів
const parentDiv = document.getElementById('parentDiv');
const childDiv = document.getElementById('childDiv');

// Обробник для фази захоплення
parentDiv.addEventListener('click', function() {
  console.log('Клік у батьківському div (захоплення)');
}, true); // true вказує, що обробник викликається на фазі захоплення

// Обробник для фази спливання
childDiv.addEventListener('click', function(event) {
  console.log('Клік у дочірньому div (спливання)');
 // event.stopPropagation(); // Запобігаємо подальшому розповсюдженню події
});

// Ще один обробник для батьківського div на фазі спливання
parentDiv.addEventListener('click', function() {
  console.log('Клік у батьківському div (спливання)');
});

// Отримуємо доступ до батьківського елементу
const list = document.getElementById('myList');

// Призначаємо обробник подій батьківському елементу
list.addEventListener('click', function(event) {
  // Перевіряємо, чи клік було здійснено по елементу li
  console.log(event.target.tagName);
  if (event.target.tagName === 'LI') {
    console.log(`Клікнуто на ${event.target.textContent}`);
  }
});