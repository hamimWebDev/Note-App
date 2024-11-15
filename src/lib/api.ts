import axios from 'axios';
import type { Note } from './types';

const API_URL = 'http://localhost:3001/api';

export const getNotes = async (): Promise<Note[]> => {
  const response = await axios.get(`${API_URL}/notes`);
  return response.data;
};

export const createNote = async (title: string, content: string): Promise<Note> => {
  const response = await axios.post(`${API_URL}/notes`, { title, content });
  return response.data;
};

export const updateNote = async (id: string, title: string, content: string): Promise<Note> => {
  const response = await axios.put(`${API_URL}/notes/${id}`, { title, content });
  return response.data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/notes/${id}`);
};