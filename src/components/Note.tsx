import React, { useState } from 'react';

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
  };

  const handleDeleteClick = () => {
    onDelete(note.id);
  };

  const handleNoteTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedText(e.target.value);
  };

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