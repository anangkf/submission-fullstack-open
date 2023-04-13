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
    let result: string;
    
    switch (true) {
      case (bmi < 18.5):
        result =  BMI.underweight;
      case (bmi <= 24.9):
        result =  BMI.normal;
      case (bmi <= 29.9):
        result =  BMI.overweight;
      default:
        result =  BMI.obesity;
    } 
    return result
  } catch (error) {
    throw(error)
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