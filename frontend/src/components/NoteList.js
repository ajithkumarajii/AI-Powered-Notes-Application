import React from "react";
import NoteCard from "./NoteCard";
import "../App.css";

const NoteList = ({ notes, onDelete, onEdit }) => (
  <div className="note-list">
    {notes.length === 0 ? (
      <p className="empty-notes">No notes found.</p>
    ) : (
      notes.map((note) => (
        <NoteCard key={note._id} note={note} onDelete={onDelete} onEdit={onEdit} />
      ))
    )}
  </div>
);

export default NoteList;
