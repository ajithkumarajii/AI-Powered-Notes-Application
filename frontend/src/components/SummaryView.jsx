import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../utils/spinner";
import ErrorMessage from "../utils/errorMessage";
import { summarizeNote } from "../redux/notesThunks";

const SummaryView = ({ note }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const notes = useSelector((state) => state.notes.notes);
  const reduxNote = notes.find((n) => n._id === note._id);
  const summary = reduxNote?.summary || "";

  useEffect(() => {
    // Update local error/loading if needed
    setError("");
    setLoading(false);
  }, [summary]);

  const handleSummarize = async () => {
    setLoading(true);
    setError("");
    try {
      await dispatch(summarizeNote(note._id));
    } catch (err) {
      setError("Failed to summarize note");
    }
    setLoading(false);
  };

  const handleRegenerate = () => {
    handleSummarize();
  };

  if (!note.content || note.content.length < 100) {
    return <p className="empty-notes">Note too short to summarize.</p>;
  }

  return (
    <div className="summary-view">
      <button
        onClick={handleSummarize}
        disabled={loading || summary}
        className="create-btn"
      >
        {loading ? <Spinner /> : summary ? "Summarized" : "Summarize"}
      </button>
      {error && <ErrorMessage message={error} />}
      {summary && (
        <div className="summary-content">
          <h4>AI Summary</h4>
          <p>{summary}</p>
          <button onClick={handleRegenerate} className="edit-btn">
            Regenerate
          </button>
        </div>
      )}
    </div>
  );
};

export default SummaryView;
