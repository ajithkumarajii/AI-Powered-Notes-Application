import React from "react";
import "../App.css";
import SummaryView from "./SummaryView.jsx";

const NoteCard = ({ note, onDelete, onEdit }) => (
  <div className="note-card">
    <h3>{note.title}</h3>
    <p>{note.content.substring(0, 100)}...</p>
    <div className="note-actions">
      <button className="edit-btn" onClick={() => onEdit(note)}>Edit</button>
      <button className="delete-btn" onClick={() => onDelete(note._id)}>Delete</button>
    </div>
    <SummaryView note={note} />
  </div>
);

export default NoteCard;
