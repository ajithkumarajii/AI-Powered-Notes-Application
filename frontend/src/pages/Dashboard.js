import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes, deleteNote, createNote, updateNote } from "../redux/notesThunks";
import NoteList from "../components/NoteList";
import NoteEditor from "../components/NoteEditor";
import NoteModal from "../components/NoteModal";
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
  const [viewingNote, setViewingNote] = useState(null);

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

  const handleView = (note) => {
    setViewingNote(note);
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
        <div>
          <h2 className="dashboard-title">Welcome{user ? `, ${user.name}` : ""}!</h2>
          <p className="dashboard-subtitle">Organize your thoughts with AI-powered insights</p>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header>
      <main>
        <div className="dashboard-actions">
          <button className="create-btn" onClick={handleCreate} disabled={!user}>+ New Note</button>
        </div>

        {notes.length === 0 && !loading && (
          <div className="dashboard-hero">
            <div className="hero-content">
              <h1 className="hero-title">Welcome to AI Notes</h1>
              <p className="hero-description">
                Your intelligent note-taking companion powered by advanced AI summarization
              </p>
              <div className="hero-features">
                <div className="hero-feature">
                  <span className="hero-icon">✨</span>
                  <div>
                    <h3>AI Summarization</h3>
                    <p>Instantly generate summaries of your notes using advanced AI technology</p>
                  </div>
                </div>
                <div className="hero-feature">
                  <span className="hero-icon">📚</span>
                  <div>
                    <h3>Organize Ideas</h3>
                    <p>Create, edit, and organize unlimited notes with beautiful formatting</p>
                  </div>
                </div>
                <div className="hero-feature">
                  <span className="hero-icon">⚡</span>
                  <div>
                    <h3>Instant Access</h3>
                    <p>Access your notes anytime, anywhere with cloud-based synchronization</p>
                  </div>
                </div>
                <div className="hero-feature">
                  <span className="hero-icon">🔒</span>
                  <div>
                    <h3>Secure & Private</h3>
                    <p>Your notes are encrypted and protected with industry-standard security</p>
                  </div>
                </div>
              </div>
              <button className="cta-btn" onClick={handleCreate}>Create Your First Note</button>
            </div>
          </div>
        )}

        {loading && <Spinner />}
        {error && <ErrorMessage message={error} />}
        {showEditor && (
          <NoteEditor note={editingNote} onSave={handleSave} />
        )}
        <NoteList notes={notes} onDelete={handleDelete} onEdit={handleEdit} onView={handleView} />
      </main>

      {viewingNote && (
        <NoteModal note={viewingNote} onClose={() => setViewingNote(null)} />
      )}
    </div>
  );
};

export default Dashboard;
