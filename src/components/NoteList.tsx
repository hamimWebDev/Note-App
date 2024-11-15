import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { FileText } from 'lucide-react';
import type { Note } from '../lib/types';

interface NoteListProps {
  notes: Note[];
  selectedNoteId?: string;
  onNoteSelect: (note: Note) => void;
}

export default function NoteList({
  notes,
  selectedNoteId,
  onNoteSelect,
}: NoteListProps) {
  return (
    <div className="space-y-2 w-full">
      {notes.map((note) => (
        <button
          key={note._id}
          onClick={() => onNoteSelect(note)}
          className={`w-full text-left p-4 rounded-lg transition-all ${
            selectedNoteId === note._id
              ? 'bg-blue-50 border-blue-200'
              : 'bg-white hover:bg-gray-50'
          } border border-gray-200 shadow-sm`}
        >
          <div className="flex items-center gap-3">
            <FileText
              size={20}
              className={selectedNoteId === note._id ? 'text-blue-600' : 'text-gray-500'}
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">{note.title}</h3>
              <p className="text-sm text-gray-500 truncate">{note.content}</p>
              <p className="text-xs text-gray-400 mt-1">
                Updated {formatDistanceToNow(new Date(note.updated_at))} ago
              </p>
            </div>
          </div>
        </button>
      ))}
      {notes.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No notes yet. Create your first note!
        </div>
      )}
    </div>
  );
}