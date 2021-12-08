interface ExercisesResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExercisesInputType {
  arr: number[];
  target: number;
}

const parseArguments = (args: Array<string>): ExercisesInputType => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (args.slice(2).every((day) => !isNaN(Number(day)))) {
    const arr = args.slice(3).map((day) => Number(day));
    const target = Number(args[2]);

    return {
      arr,
      target,
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateExercises = (
  arr: Array<number>,
  target: number
): ExercisesResult => {
  const periodLength = arr.length;
  const trainingDays = arr.filter((day) => day > 0).length;
  const success = arr.every((day) => day > target);
  const average = arr.reduce((a, b) => a + b) / periodLength;

  const ratingDescriptionList = ['poorly', 'good', 'perfect'];

  let rating;
  const successDays = arr.filter((day) => day > target).length;
  if (successDays === periodLength) {
    rating = 3;
  } else if (successDays > periodLength / 2) {
    rating = 2;
  } else {
    rating = 1;
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription: ratingDescriptionList[rating - 1],
    target,
    average,
  };
};

try {
  const { arr, target } = parseArguments(process.argv);
  console.log(calculateExercises(arr, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export default calculateExercises;
