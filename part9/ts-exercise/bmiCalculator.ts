type BmiValuesType = {
  underweight: string;
  normal: string,
  overweight: string;
  obesity: string;
};

const BMI: BmiValuesType = {
  underweight: 'Underweight',
  normal: 'Normal',
  overweight: 'Overweight',
  obesity: 'Obesity',
};

const calculateBmi = (height: number, weight: number) => {
  const bmi = weight / Math.pow(height/100, 2)

  switch (true) {
    case (bmi < 18.5):
      return BMI.underweight;
    case (bmi <= 24.9):
      return BMI.normal;
    case (bmi <= 29.9):
      return BMI.overweight;
    default:
      return BMI.obesity;
  }
}

console.log(calculateBmi(167, 70)); //Overweight