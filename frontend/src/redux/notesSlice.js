import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [],
  loading: false,
  error: null,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setNotes(state, action) {
      state.notes = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading(state) {
      state.loading = true;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    addNote(state, action) {
      state.notes.push(action.payload);
      state.loading = false;
    },
    updateNote(state, action) {
      const idx = state.notes.findIndex(n => n._id === action.payload._id);
      if (idx !== -1) state.notes[idx] = action.payload;
      state.loading = false;
    },
    deleteNote(state, action) {
      state.notes = state.notes.filter(n => n._id !== action.payload);
    },
  },
});

export const { setNotes, setLoading, setError, addNote, updateNote, deleteNote } = notesSlice.actions;
export default notesSlice.reducer;
