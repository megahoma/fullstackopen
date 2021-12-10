import diagnoseData from '../../data/diagnoses.json';
import { Diagnose } from '../types';

const diagnose: Array<Diagnose> = diagnoseData;

const getEntries = (): Array<Diagnose> => {
  return diagnose;
};

export default {
  getEntries,
};
