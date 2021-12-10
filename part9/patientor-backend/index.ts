import express from 'express';
import cors from 'cors';
const app = express();

import diagnosRouter from './src/routes/diagnoses';
import patientsRouter from './src/routes/patients';

app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
