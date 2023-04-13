import { isNumber } from "./isNumber";

type BmiValuesType = {
  underweight: string;
  normal: string;
  overweight: string;
  obesity: string;
};

type ParsedBmiArgs = {
  parsedHeight: number;
  parsedWeight: number;
}

const BMI: BmiValuesType = {
  underweight: 'Underweight',
  normal: 'Normal',
  overweight: 'Overweight',
  obesity: 'Obesity',
};


export const calculateBmi = (height: any, weight: any): string => {
  try {
    const { parsedHeight, parsedWeight } = parseArgs(height, weight)
    const bmi = parsedWeight / Math.pow(parsedHeight/100, 2)
    let result: string;
    
    switch (true) {
      case (bmi < 18.5):
        result = BMI.underweight;
        break;
      case (bmi <= 24.9):
        result = BMI.normal;
        break;
      case (bmi <= 29.9):
        result = BMI.overweight;
        break;
      default:
        result = BMI.obesity;
    } 
    return result
  } catch (error) {
    throw(error)
  }
}

function parseArgs ( height: string, weight: string ): ParsedBmiArgs {
  if (isNumber(height) && isNumber(weight)) {
    return {
      parsedHeight: Number(height),
      parsedWeight: Number(weight)
    }
  } else {
    throw new Error('One of your arguments was not a number')
  }
}