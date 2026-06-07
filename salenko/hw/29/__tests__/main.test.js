const { ageClassification, weekFn } = require('../main')

// №2 Тестування функції `ageClassification(num)`:** Ваше завдання полягає у написанні тестів для функції `ageClassification(num)`, яка класифікує вік людини. 

describe('ageClassification', () => {

  describe('повертає null для некоректних значень', () => {
    test('від\'ємне число (-1) → null', () => {
      expect(ageClassification(-1)).toBeNull()
    })
    test('дробове вище рекорду (122.01) → null', () => {
      expect(ageClassification(122.01)).toBeNull()
    })
    test('велике число (150) → null', () => {
      expect(ageClassification(150)).toBeNull()
    })
  })

  describe('Дитинство (0–24)', () => {
    test('0 → Дитинство', () => {
      expect(ageClassification(0)).toBe('Дитинство')
    })
    test('1 → Дитинство', () => {
      expect(ageClassification(1)).toBe('Дитинство')
    })
    test('24 → Дитинство', () => {
      expect(ageClassification(24)).toBe('Дитинство')
    })
  })

  describe('Молодість (24.01–44)', () => {
    test('24.01 → Молодість', () => {
      expect(ageClassification(24.01)).toBe('Молодість')
    })
    test('44 → Молодість', () => {
      expect(ageClassification(44)).toBe('Молодість')
    })
  })

  describe('Зрілість (44.01–65)', () => {
    test('44.01 → Зрілість', () => {
      expect(ageClassification(44.01)).toBe('Зрілість')
    })
    test('65 → Зрілість', () => {
      expect(ageClassification(65)).toBe('Зрілість')
    })
  })

  describe('Старість (65.1–75)', () => {
    test('65.1 → Старість', () => {
      expect(ageClassification(65.1)).toBe('Старість')
    })
    test('75 → Старість', () => {
      expect(ageClassification(75)).toBe('Старість')
    })
  })

  describe('Довголіття (75.01–90)', () => {
    test('75.01 → Довголіття', () => {
      expect(ageClassification(75.01)).toBe('Довголіття')
    })
    test('90 → Довголіття', () => {
      expect(ageClassification(90)).toBe('Довголіття')
    })
  })

  describe('Рекорд (90.01–122)', () => {
    test('90.01 → Рекорд', () => {
      expect(ageClassification(90.01)).toBe('Рекорд')
    })
    test('122 → Рекорд', () => {
      expect(ageClassification(122)).toBe('Рекорд')
    })
  })

})

// №3 Тестування функції weekFn(cond): Напишіть тести для функції weekFn(cond), що повертає назву дня тижня за заданим числом.

describe('weekFn', () => {

  describe('коректно повертає назву дня для чисел 1–7', () => {
    test('1 → Понеділок', () => {
      expect(weekFn(1)).toBe('Понеділок')
    })
    test('2 → Вівторок', () => {
      expect(weekFn(2)).toBe('Вівторок')
    })
    test('3 → Середа', () => {
      expect(weekFn(3)).toBe('Середа')
    })
    test('4 → Четвер', () => {
      expect(weekFn(4)).toBe('Четвер')
    })
    test("5 → П'ятниця", () => {
      expect(weekFn(5)).toBe("П'ятниця")
    })
    test('6 → Субота', () => {
      expect(weekFn(6)).toBe('Субота')
    })
    test('7 → Неділя', () => {
      expect(weekFn(7)).toBe('Неділя')
    })
  })

  describe('повертає null для некоректних значень', () => {
    test('9 → null (поза діапазоном)', () => {
      expect(weekFn(9)).toBeNull()
    })
    test('0 → null (поза діапазоном)', () => {
      expect(weekFn(0)).toBeNull()
    })
    test('1.5 → null (дробове число)', () => {
      expect(weekFn(1.5)).toBeNull()
    })
    test('"2" → null (рядок замість числа)', () => {
      expect(weekFn('2')).toBeNull()
    })
  })

})
