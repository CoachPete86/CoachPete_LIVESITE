function calculateFitnessAge(age, bmi, activity) {
  let fitnessAge = age;
  if (bmi < 18.5) fitnessAge += 2;
  else if (bmi > 24.9) fitnessAge += Math.floor((bmi - 24.9) * 0.5);
  const activityAdjustments = {
    sedentary: 5,
    light: 2,
    moderate: -1,
    active: -3,
    very_active: -5,
  };
  fitnessAge += activityAdjustments[activity] || 0;

  // Ensure the result stays within the expected bounds
  fitnessAge = Math.max(age - 10, Math.min(age + 15, fitnessAge));
  return Math.max(18, fitnessAge);
}
module.exports = { calculateFitnessAge };
