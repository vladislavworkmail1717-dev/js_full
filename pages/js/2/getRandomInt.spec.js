const { getRandomInt } = require('./getRandomint.js'); // Вкажіть правильний шлях до файлу з функцією

describe('Тестування функції getRandomInt', () => {

  test('має повертати випадкове число в діапазоні від min до max', () => {
    expect(getRandomInt(1, 10)).toBeGreaterThanOrEqual(1);
    expect(getRandomInt(1, 10)).toBeLessThanOrEqual(10);
  });

});