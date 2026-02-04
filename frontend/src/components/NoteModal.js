import React from "react";
import "../App.css";
import SummaryView from "./SummaryView";

const NoteModal = ({ note, onClose }) => {
  if (!note) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{note.title}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="modal-section">
            <h3 className="modal-section-title">📝 Original Note</h3>
            <div className="modal-content-box">
              <p className="note-full-content">{note.content}</p>
            </div>
          </div>

          <div className="modal-section">
            <h3 className="modal-section-title">✨ AI Summary</h3>
            <SummaryView note={note} />
          </div>

          <div className="modal-meta">
            <span className="modal-meta-item">
              📅 {new Date(note.createdAt).toLocaleDateString()}
            </span>
            {note.updatedAt && note.updatedAt !== note.createdAt && (
              <span className="modal-meta-item">
                ✏️ Updated {new Date(note.updatedAt).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button className="modal-close-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
