import React, { useState, useEffect } from 'react';
import { PlusCircle, StickyNote } from 'lucide-react';
import NoteEditor from './components/NoteEditor';
import NoteList from './components/NoteList';
import { getNotes, createNote, updateNote, deleteNote } from './lib/api';
import type { Note } from './lib/types';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const loadedNotes = await getNotes();
      setNotes(loadedNotes);
      setError(null);
    } catch (err) {
      setError('Failed to load notes. Please try again later.');
      console.error('Failed to load notes:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateNote = async (title: string, content: string) => {
    try {
      await createNote(title, content);
      await loadNotes();
      setSelectedNote(null);
      setError(null);
    } catch (err) {
      setError('Failed to create note. Please try again.');
      console.error('Failed to create note:', err);
    }
  };

  const handleUpdateNote = async (title: string, content: string) => {
    if (selectedNote?._id) {
      try {
        await updateNote(selectedNote._id, title, content);
        await loadNotes();
        setSelectedNote(null);
        setError(null);
      } catch (err) {
        setError('Failed to update note. Please try again.');
        console.error('Failed to update note:', err);
      }
    }
  };

  const handleDeleteNote = async () => {
    if (selectedNote?._id) {
      try {
        await deleteNote(selectedNote._id);
        await loadNotes();
        setSelectedNote(null);
        setError(null);
      } catch (err) {
        setError('Failed to delete note. Please try again.');
        console.error('Failed to delete note:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <StickyNote size={32} className="text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Notes App</h1>
          </div>
          <button
            onClick={() => setSelectedNote(null)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusCircle size={20} />
            New Note
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Your Notes</h2>
            {isLoading ? (
              <div className="text-center py-8 text-gray-500">Loading notes...</div>
            ) : (
              <NoteList
                notes={notes}
                selectedNoteId={selectedNote?._id}
                onNoteSelect={setSelectedNote}
              />
            )}
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              {selectedNote ? 'Edit Note' : 'Create New Note'}
            </h2>
            <NoteEditor
              noteId={selectedNote?._id}
              initialTitle={selectedNote?.title}
              initialContent={selectedNote?.content}
              onSave={selectedNote ? handleUpdateNote : handleCreateNote}
              onDelete={selectedNote ? handleDeleteNote : undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;