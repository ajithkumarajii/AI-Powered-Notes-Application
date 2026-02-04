import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes, deleteNote, createNote, updateNote } from "../redux/notesThunks";
import NoteList from "../components/NoteList";
import NoteEditor from "../components/NoteEditor";
import Spinner from "../utils/spinner";
import ErrorMessage from "../utils/errorMessage";
import { logout } from "../redux/authSlice";
import "../App.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { notes, loading, error } = useSelector((state) => state.notes);
  const { user } = useSelector((state) => state.auth);
  const [editingNote, setEditingNote] = useState(null);
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteNote(id));
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setShowEditor(true);
  };

  const handleCreate = () => {
    setEditingNote(null);
    setShowEditor(true);
  };

  const handleSave = (note) => {
    if (!note._id) {
      dispatch(createNote(note));
    } else {
      dispatch(updateNote(note));
    }
    setShowEditor(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/login";
  };

  if (!user) {
    return <ErrorMessage message="You are not authorized. Please login." />;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Welcome{user ? `, ${user.name}` : ""}!</h2>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header>
      <main>
        <button className="create-btn" onClick={handleCreate} disabled={!user}>Create Note</button>
        {loading && <Spinner />}
        {error && <ErrorMessage message={error} />}
        {notes.length === 0 && !loading && <p className="empty-notes">No notes found. Create your first note!</p>}
        {showEditor && (
          <NoteEditor note={editingNote} onSave={handleSave} />
        )}
        <NoteList notes={notes} onDelete={handleDelete} onEdit={handleEdit} />
      </main>
    </div>
  );
};

export default Dashboard;
