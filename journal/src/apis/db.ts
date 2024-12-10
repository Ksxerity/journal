import axios from 'axios';
import { JournalEntry, JournalEntryBody } from '../types';
import { getISOStringLocal } from '../utils';

const apiUrlBase = 'http://localhost:5000/api';

export const getJournalEntriesByYear = async (year: number): Promise<JournalEntry[]> => {
  const apiUrl = `${apiUrlBase}/journalentries/year/${year}`;

  const response = await axios.get(apiUrl)
  return response.data;
}

export const getAllJournalEntries = async (): Promise<JournalEntry[]> => {
  const apiUrl = `${apiUrlBase}/journalentries`;

  const response = await axios.get(apiUrl)
  return response.data;
}

export const getJournalEntryByDate = async (date: string): Promise<JournalEntry> => {
  const dateTime = getISOStringLocal(date);
  const apiUrl = `${apiUrlBase}/journalentries/${dateTime}`;

  const response = await axios.get(apiUrl);
  return response.data;
}

export const createJournalEntry = async (data: JournalEntryBody) => {
  const apiUrl = `${apiUrlBase}/journalentries`;

  return axios.post(apiUrl, data)
}

export const updateJournalEntry = async (data: JournalEntry) => {
  const apiUrl = `${apiUrlBase}/journalentries/${data.id}`;

  return axios.put(apiUrl, data)
}