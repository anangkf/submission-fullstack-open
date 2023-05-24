import axios from "axios";
import { EntryFormValues, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getOne = async (id: string) => {
  try {
    const res = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`)
    return res.data;
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const createEntry = async (patientId: string, entry: EntryFormValues) => {
  try {
    const res = await axios.post(`${apiBaseUrl}/patients/${patientId}/entries`, entry)
    return res.data;
  } catch (error: any) {
    throw new Error(error.message)
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll, getOne, create, createEntry
};

