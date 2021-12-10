import express from 'express';
const router = express.Router();

import service from '../services/patients';

router.get('/', (_req, res) => {
  res.send(service.getEntries());
});

export default router;
