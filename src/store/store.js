import { create } from "zustand";
import axios from "axios";

export const useMarksStore = create((set) => ({
  marks: [],
  fetchMarks: async () => {
    const res = await axios.get("http://localhost:5000/marks");
    set({ marks: res.data });
  },
  addMark: async (newMarks) => {
    await axios.post("http://localhost:5000/marks", { marks: newMarks });
    set((state) => ({ marks: [...state.marks, ...newMarks.map((value, index) => ({ id: Date.now() + index, value }))] }));
  },
  updateMark: async (id, newValue) => {
    await axios.put(`http://localhost:5000/marks/${id}`, { value: newValue });
    set((state) => ({
      marks: state.marks.map((mark) => (mark.id === id ? { ...mark, value: newValue } : mark)),
    }));
  },
  deleteMark: async (id) => {
    await axios.delete(`http://localhost:5000/marks/${id}`);
    set((state) => ({ marks: state.marks.filter((mark) => mark.id !== id) }));
  },
}));

export const useAuthStore = create((set) => ({
  user: null,
  login: (username) => set({ user: username }),
  logout: () => set({ user: null }),
}));
