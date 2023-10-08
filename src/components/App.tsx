import React, { useState } from 'react';
import Note from './Note';

const App = () => {
  const [notes, setNotes] = useState([{ id: 1, text: 'Пример заметки' }]);
  const [newNoteText, setNewNoteText] = useState('');

  const handleNoteTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNoteText(e.target.value);
  };

  const handleNoteSubmit = () => {
    if (newNoteText) {
      const newNote = { id: Date.now(), text: newNoteText };
      setNotes([...notes, newNote]);
      setNewNoteText('');
    }
  };

  const handleNoteDelete = (id: number) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  return (
    <div>
      <h1>Заметки</h1>
      <input type="text" value={newNoteText} onChange={handleNoteTextChange} placeholder="Введите текст здесь" />      
      <button onClick={handleNoteSubmit}>Добавить заметку</button>
      <ul>
        {notes.map((note) => (
          <Note key={note.id} note={note} onDelete={handleNoteDelete} />
        ))}
      </ul>
    </div>
  );
};

export default App;