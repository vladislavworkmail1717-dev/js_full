const { ageClassification, weekFn, greet } = require('./test_file.js'); // Вкажіть правильний шлях до файлу з функцією

describe('Тестування функції ageClassification', () => {

  test('має повертати null для відʼємних чисел та віку понад 122', () => {
    expect(ageClassification(-1)).toBeNull();
    expect(ageClassification(123)).toBeNull();
  });

  test('має повертати "Дитинство" для віку від 0 до 24', () => {
    expect(ageClassification(0)).toBe('Дитинство');
    expect(ageClassification(12)).toBe('Дитинство');
    expect(ageClassification(24)).toBe('Дитинство');
  });

  test('має повертати "Молодість" для віку від 25 до 44', () => {
    expect(ageClassification(25)).toBe('Молодість');
    expect(ageClassification(44)).toBe('Молодість');
  });

  test('має повертати "Зрілість" для віку від 45 до 65', () => {
    expect(ageClassification(45)).toBe('Зрілість');
    expect(ageClassification(65)).toBe('Зрілість');
  });

  test('має повертати "Старість" для віку від 66 до 75', () => {
    expect(ageClassification(66)).toBe('Старість');
    expect(ageClassification(75)).toBe('Старість');
  });

  test('має повертати "Довголіття" для віку від 76 до 90', () => {
    expect(ageClassification(76)).toBe('Довголіття');
    expect(ageClassification(90)).toBe('Довголіття');
  });

  test('має повертати "Рекорд" для віку від 91 до 122', () => {
    expect(ageClassification(91)).toBe('Рекорд');
    expect(ageClassification(122)).toBe('Рекорд');
  });

});


describe('Тестування функції weekFn', () => {

  test('має повертати правильні назви для днів тижня від 1 до 7', () => {
    expect(weekFn(1)).toBe('Понеділок');
    expect(weekFn(2)).toBe('Вівторок');
    expect(weekFn(3)).toBe('Середа');
    expect(weekFn(4)).toBe('Четвер');
    expect(weekFn(5)).toBe("П'ятниця");
    expect(weekFn(6)).toBe('Субота');
    expect(weekFn(7)).toBe('Неділя');
  });

  test('має повертати null для чисел поза діапазоном 1-7', () => {
    expect(weekFn(0)).toBeNull();
    expect(weekFn(8)).toBeNull();
    expect(weekFn(-5)).toBeNull();
  });

  test('має повертати null для нечислових типів даних або порожніх значень', () => {
    expect(weekFn('1')).toBeNull(); // Рядок замість числа
    expect(weekFn(null)).toBeNull();
    expect(weekFn(undefined)).toBeNull();
    expect(weekFn()).toBeNull();
  });

});

// Тест
describe('greet', () => {
  let consoleSpy;
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });
  it('викликає console.log з правильним аргументом', () => {
    // consoleSpy = jest.spyOn(console, 'log');
    greet('World');
    expect(consoleSpy).toHaveBeenCalledWith('Hello, World!');
    consoleSpy.mockRestore(); // Повертаємо спочатку
  });
});