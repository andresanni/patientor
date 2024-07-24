import axios from "axios";
import { NewPatient, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getById = async (id: string): Promise<Patient> => {
  const { data } = await axios.get(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const create = async (object: PatientFormValues) => {
  const newPatient: NewPatient = { ...object, entries: [] };

  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    newPatient
  );

  return data;
};

export default {
  getAll,
  create,
  getById,
};
