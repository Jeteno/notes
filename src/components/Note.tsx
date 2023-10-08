import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    setEditedText(editedText);
    localStorage.setItem(`note-${note.id}`, editedText);
  };

  const handleDeleteClick = () => {
    onDelete(note.id);
    localStorage.removeItem(`note-${note.id}`);
  };

  const handleNoteTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedText(e.currentTarget.value);
  };

  useEffect(() => {
    const savedText = localStorage.getItem(`note-${note.id}`);
    if (savedText) {
      setEditedText(savedText);
    }
  }, [note.id]);

  return (
    <li className="input-group mb-3">
      {isEditing ? (
         <>
            <input
               type="text"
               value={editedText}
               onChange={handleNoteTextChange}
               title="Введите текст"
               placeholder="Введите текст"
               className="form-control"
            />
            <div className="input-group-append">
               <button className="btn btn-outline-secondary mr-10" onClick={handleSaveClick}>Сохранить</button>
            </div>
         </>
      ) : (
         <>
            <span className="form-control text-muted">{editedText}</span> {/* Используем отредактированный текст */}
            <div className="input-group-append">
              <button className="btn btn-outline-secondary mr-10" onClick={handleEditClick}>Редактировать</button>
            </div>
        </>
      )}
      <div className="input-group-append">
         <button className="btn btn-outline-secondary" onClick={handleDeleteClick}>Удалить</button>
      </div>
    </li>
  );
};

export default Note;