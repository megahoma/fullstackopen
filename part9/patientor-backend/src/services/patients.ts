import { v1 as uuid } from 'uuid';

import data from '../../data/patients.json';
import { Patient } from '../types';

const patients: Array<Patient> = data as Array<Patient>;

const getEntries = (): Omit<Patient, 'ssn'>[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addEntry = (data: Omit<Patient, 'id'>): Patient => {
  const id: string = uuid();
  const newEntry = { id, ...data };

  patients.push(newEntry);
  return newEntry;
};

export default {
  getEntries,
  addEntry,
};
