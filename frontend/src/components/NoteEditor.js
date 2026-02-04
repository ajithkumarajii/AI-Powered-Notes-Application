import React, { useState, useEffect } from "react";
import "../App.css";

const NoteEditor = ({ note, onSave }) => {
  const [title, setTitle] = useState(note ? note.title : "");
  const [content, setContent] = useState(note ? note.content : "");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...note, title, content });
  };

  return (
    <div className="note-editor-container">
      <form className="note-editor-form" onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label>Content</label>
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit" className="save-btn">
          {note ? "Update Note" : "Create Note"}
        </button>
      </form>
    </div>
  );
};

export default NoteEditor;
