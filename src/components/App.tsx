import React, { useState, useEffect } from 'react';
import Note from './Note';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'macro-css';

interface Note {
  id: number;
  text: string;
}

const App = () => {
   const [selectedNote, setSelectedNote] = useState<Note | null>(null);
   

  const [notes, setNotes] = useState<Note[]>(() => {
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
      const newNote = {
         id: notes.length + 1,
         text: newNoteText
      };
   
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      setNewNoteText('');
      }
   };

  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  const handleNoteDelete = (note: Note) => {
   const updatedNotes = notes.filter((n: Note) => n.id !== note.id);
   setNotes(updatedNotes);
   localStorage.setItem('notes', JSON.stringify(updatedNotes));
   
   if (selectedNote && selectedNote.id === note.id) {
     setSelectedNote(null); 
   }
 };

 const renderNotes = () => {
   return notes.map((note: Note) => (
     <Note key={note.id} note={note} onDelete={() => handleNoteDelete(note)} />
   ));
 };

  return (
   <>
   <div className="wrapper">
      <div className="note__container container mt-15">
         <div className="note__page page card border-dark mb-3 w100p h100p" >
            <div className="note__content">
               <h1 className="card-header">Заметки</h1>
            </div>
            <div className="card-body text-dark">
               <div className="input-group mb-3">
                  <input className="form-control" type="text" value={newNoteText} onChange={handleNoteTextChange} placeholder="Введите текст здесь" />
                  <div className="input-group-append">
                     <button className="btn btn-outline-secondary" onClick={handleNoteSubmit}>Добавить заметку</button>
                  </div>
               </div>
               <nav className="note__list">
                  <ul className="list-group">{renderNotes()}</ul>
               </nav>
            </div>
         </div>
      </div>
   </div>
   
   </>
  );
};

export default App;