import express from 'express';
const router = express.Router();

import diagnoses from '../services/diagnoses';

router.get('/', (_req, res) => {
  res.send(diagnoses.getEntries());
});

export default router;
