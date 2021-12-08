import express from 'express';
const app = express();

import calculateBmi from './bmiCalculator';
import calculateExercises from './trainingCalculator';

app.use(express.json());

app.get('/', (_req, res) => {
  return res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);

  if (!weight || !height) {
    return res
      .status(400)
      .json({
        error: 'malformatted parameters',
      })
      .end();
  }

  try {
    const bmi = calculateBmi(weight, height);
    return res.status(200).json({ weight, height, bmi }).end();
  } catch (error) {
    return res
      .status(400)
      .json({
        error: 'malformatted parameters',
      })
      .end();
  }
});

app.post('/calculator', (req, res) => {
  const body = req.body;
  const arr = body.daily_exercises;
  const target = Number(body.target);

  if (!arr || !target) {
    return res
      .status(400)
      .json({
        error: 'malformatted parameters',
      })
      .end();
  }

  try {
    const result = calculateExercises(arr, target);
    return res.status(200).send(result).end();
  } catch (error) {
    return res
      .status(400)
      .json({
        error: 'malformatted parameters',
      })
      .end();
  }
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
