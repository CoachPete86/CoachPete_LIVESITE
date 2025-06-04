const { calculateFitnessAge } = require('../scripts/calculateFitnessAge');

describe('calculateFitnessAge', () => {
  test('returns value within age - 10 and age + 15 for sample inputs', () => {
    const samples = [
      { age: 20, bmi: 22, activity: 'moderate', expected: 19 },
      { age: 40, bmi: 30, activity: 'sedentary', expected: 47 },
      { age: 30, bmi: 17, activity: 'active', expected: 29 },
    ];

    for (const { age, bmi, activity, expected } of samples) {
      const result = calculateFitnessAge(age, bmi, activity);
      expect(result).toBeGreaterThanOrEqual(age - 10);
      expect(result).toBeLessThanOrEqual(age + 15);
      expect(result).toBe(expected);
    }
  });
});
