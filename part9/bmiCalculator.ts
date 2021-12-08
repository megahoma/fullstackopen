interface BmiInputType {
  height: number
  weight: number
}

const parseArguments = (args: Array<string>): BmiInputType => {
  if (args.length < 4) throw new Error('Not enough arguments')

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
}

const calculateBmi = (height: number, weight: number): string => {
  if (height <= 0 || weight <= 0) {
    throw new Error("Can't divide by 0!")
  }

  const bmi = weight / (height / 100) ** 2

  if (bmi < 18.5) {
    return 'Underweight'
  } else if (18.5 <= bmi && bmi <= 24.9) {
    return 'Overweight (not healthy weight)'
  } else if (25 <= bmi && bmi <= 29.9) {
    return 'Normal (healthy weight)'
  } else {
    return 'Obesity (not healthy weight)'
  }
}

try {
  const { height, weight } = parseArguments(process.argv)
  console.log(calculateBmi(height, weight))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}

export default calculateBmi
