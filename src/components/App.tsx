import React, { useState } from 'react';
import Note from './Note';

const App = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      return JSON.parse(savedNotes);
    } else {
      return [{ id: 1, text: 'Пример заметки' }];
    }
  });
  const [newNoteText, setNewNoteText] = useState('');

  const handleNoteTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNoteText(e.target.value);
  };

  const handleNoteSubmit = () => {
    if (newNoteText) {
      const newNote = { id: Date.now(), text: newNoteText };
      setNotes([...notes, newNote]);
      setNewNoteText('');
      localStorage.setItem('notes', JSON.stringify([...notes, newNote]));
    }
  };

  interface Note {
   id: number;
   text: string;
 }
 
 const handleNoteDelete = (note: Note) => {
   const updatedNotes = notes.filter((n: Note) => n.id !== note.id);
   setNotes(updatedNotes);
   localStorage.setItem('notes', JSON.stringify(updatedNotes));
 };

 const renderNotes = () => {
   return notes.map((note: Note) => (
     <Note key={note.id} note={note} onDelete={(id: number) => handleNoteDelete(note)} />
   ));
 };

 return (
   <div>
     <h1>Заметки</h1>
     <input type="text" value={newNoteText} onChange={handleNoteTextChange} placeholder="Введите текст здесь" />      
     <button onClick={handleNoteSubmit}>Добавить заметку</button>
     <ul>
       {notes.map((note: Note) => (
         <Note key={note.id} note={note} onDelete={() => handleNoteDelete(note)} />
       ))}
     </ul>
   </div>
 );
};

export default App;