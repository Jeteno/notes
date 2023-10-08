import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
interface NoteProps {
    note: {
        id: number;
        text: string;
    };
    onDelete: (id: number) => void;
}
declare const Note: React.FC<NoteProps>;
export default Note;
