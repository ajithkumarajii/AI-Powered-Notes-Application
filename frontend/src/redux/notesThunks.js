import { setNotes, setLoading, setError, addNote, updateNote as updateNoteAction, deleteNote as deleteNoteAction } from "./notesSlice";
import api from "../services/api";

export const fetchNotes = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const res = await api.get("/notes");
    dispatch(setNotes(res.data.notes));
  } catch (err) {
    dispatch(setError(err.message));
  }
};

export const createNote = (noteData) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const res = await api.post("/notes", noteData);
    dispatch(addNote(res.data.note));
  } catch (err) {
    dispatch(setError(err.message));
  }
};

export const updateNote = (noteData) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const res = await api.put(`/notes/${noteData._id}`, noteData);
    dispatch(updateNoteAction(res.data.note));
  } catch (err) {
    dispatch(setError(err.message));
  }
};

export const deleteNote = (id) => async (dispatch) => {
  dispatch(setLoading());
  try {
    await api.delete(`/notes/${id}`);
    dispatch(deleteNoteAction(id));
  } catch (err) {
    dispatch(setError(err.message));
  }
};

export const summarizeNote = (id) => async (dispatch, getState) => {
  dispatch(setLoading());
  try {
    const res = await api.post(`/notes/${id}/summarize`);
    // Update summary in the correct note
    const notes = getState().notes.notes.map(note =>
      note._id === id ? { ...note, summary: res.data.summary } : note
    );
    dispatch(setNotes(notes));
    return res.data.summary;
  } catch (err) {
    dispatch(setError(err.message));
    throw err;
  }
};
