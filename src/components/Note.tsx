import React, { useState, useEffect } from 'react';

interface NoteProps {
   note: { id: number; text: string };
   onDelete: (id: number) => void;
}

const Note: React.FC<NoteProps> = ({ note, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(note.text);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Сохраняем отредактированный текст в LocalStorage
    localStorage.setItem(`note-${note.id}`, editedText);
  };

  const handleDeleteClick = () => {
    onDelete(note.id);
    // Удаляем заметку из LocalStorage
    localStorage.removeItem(`note-${note.id}`);
  };

  const handleNoteTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedText(e.target.value);
  };

  // Получаем сохраненные заметки при загрузке компонента
  useEffect(() => {
    const savedText = localStorage.getItem(`note-${note.id}`);
    if (savedText) {
      setEditedText(savedText);
    }
  }, [note.id]);

  return (
    <li>
      {isEditing ? (
        <>
         <input type="text" value={editedText} onChange={handleNoteTextChange} title="Введите текст" placeholder="Введите текст" />          
         <button onClick={handleSaveClick}>Сохранить</button>
        </>
      ) : (
        <>
          <span>{note.text}</span>
          <button onClick={handleEditClick}>Редактировать</button>
        </>
      )}
      <button onClick={handleDeleteClick}>Удалить</button>
    </li>
  );
};

export default Note;