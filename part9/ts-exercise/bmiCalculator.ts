import { isNumber } from "./isNumber";

type BmiValuesType = {
  underweight: string;
  normal: string;
  overweight: string;
  obesity: string;
};

type BmiArgs = {
  height: number;
  weight: number;
}

const BMI: BmiValuesType = {
  underweight: 'Underweight',
  normal: 'Normal',
  overweight: 'Overweight',
  obesity: 'Obesity',
};

const calculateBmi = (): string => {
  try {
    const { height, weight } = parseArgs(process.argv)
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
  } catch (error) {
    console.log(`Something bad happened: ${error.message}`)
  }
}

function parseArgs ( args: string[] ): BmiArgs {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('Too many arguments')
  const [ , , height, weight ] = args

  if (isNumber(height) && isNumber(weight)) {
    return {
      height: Number(height),
      weight: Number(weight)
    }
  } else {
    throw new Error('One of your arguments was not a number')
  }
}

console.log(calculateBmi());