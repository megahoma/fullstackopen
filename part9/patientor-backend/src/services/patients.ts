import { v1 as uuid } from 'uuid';

import data from '../../data/patients.json';
import { PublicPatient } from '../types';

const patients: Array<PublicPatient> = data as Array<PublicPatient>;

const getEntries = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getIdEntries = (id: string): Omit<PublicPatient, 'ssn'>[] => {
  return patients.filter((el) => el.id === id);
};

const addEntry = (data: Omit<PublicPatient, 'id'>): PublicPatient => {
  const id: string = uuid();
  const newEntry = { id, ...data };

  patients.push(newEntry);
  return newEntry;
};

export default {
  getEntries,
  getIdEntries,
  addEntry,
};
