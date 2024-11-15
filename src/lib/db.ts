import { openDB } from 'idb';

const dbName = 'notesDB';
const storeName = 'notes';

const db = await openDB(dbName, 1, {
  upgrade(db) {
    const store = db.createObjectStore(storeName, {
      keyPath: 'id',
      autoIncrement: true,
    });
    store.createIndex('updated_at', 'updated_at');
  },
});

export interface Note {
  id?: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export const getNotes = async (): Promise<Note[]> => {
  return db.getAllFromIndex(storeName, 'updated_at');
};

export const getNote = async (id: number): Promise<Note | undefined> => {
  return db.get(storeName, id);
};

export const createNote = async (title: string, content: string): Promise<number> => {
  const now = new Date().toISOString();
  const note: Note = {
    title,
    content,
    created_at: now,
    updated_at: now,
  };
  return db.add(storeName, note);
};

export const updateNote = async (id: number, title: string, content: string): Promise<void> => {
  const note = await getNote(id);
  if (note) {
    const updatedNote: Note = {
      ...note,
      title,
      content,
      updated_at: new Date().toISOString(),
    };
    await db.put(storeName, updatedNote);
  }
};

export const deleteNote = async (id: number): Promise<void> => {
  await db.delete(storeName, id);
};