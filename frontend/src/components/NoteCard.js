import React from "react";
import "../App.css";
import SummaryView from "./SummaryView.jsx";

const NoteCard = ({ note, onDelete, onEdit, onView }) => (
  <div className="note-card">
    <div className="note-card-header">
      <h3 className="note-title">{note.title}</h3>
      <div className="note-actions">
        <button className="view-btn" onClick={() => onView(note)} title="View full note">👁️</button>
        <button className="edit-btn" onClick={() => onEdit(note)}>Edit</button>
        <button className="delete-btn" onClick={() => onDelete(note._id)}>Delete</button>
      </div>
    </div>
    <p className="note-content-preview">{note.content.substring(0, 100)}...</p>
    <SummaryView note={note} />
  </div>
);

export default NoteCard;
