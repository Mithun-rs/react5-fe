import { useEffect, useState } from "react";
import { useMarksStore, useAuthStore } from "../store/store";
import "../styles/markentry.css";

export default function MarkEntry() {
  const { marks, fetchMarks, addMark, updateMark, deleteMark } = useMarksStore();
  const { user, logout } = useAuthStore();
  const [newMarks, setNewMarks] = useState(["", "", "", "", ""]);
  const [editingId, setEditingId] = useState(null);
  const [editedValue, setEditedValue] = useState("");

  useEffect(() => {
    fetchMarks();
  }, []);

  const handleSubmit = () => {
    if (newMarks.some(mark => mark === "")) {
      alert("Please enter all 5 marks.");
      return;
    }
    addMark(newMarks);
    setNewMarks(["", "", "", "", ""]);
  };

  const handleEdit = (id, value) => {
    setEditingId(id);
    setEditedValue(value);
  };

  const handleUpdate = (id) => {
    updateMark(id, editedValue);
    setEditingId(null);
  };

  return (
    <div className="marks-container">
      <h2>Welcome, {user}!</h2>
      <button className="logout-btn" onClick={logout}>Logout</button>

      <div>
        {newMarks.map((mark, index) => (
          <input
            key={index}
            type="number"
            value={mark}
            onChange={(e) => {
              const updatedMarks = [...newMarks];
              updatedMarks[index] = e.target.value;
              setNewMarks(updatedMarks);
            }}
          />
        ))}
      </div>
      <button className="submit-btn" onClick={handleSubmit}>Submit Marks</button>

      <div className="marks-list">
        <h3>Marks List:</h3>
        {marks.map((mark) => (
          <div key={mark.id} className="marks-item">
            {editingId === mark.id ? (
              <>
                <input
                  type="number"
                  value={editedValue}
                  onChange={(e) => setEditedValue(e.target.value)}
                />
                <button className="save-btn" onClick={() => handleUpdate(mark.id)}>Save</button>
              </>
            ) : (
              <>
                <span>{mark.value}</span>
                <button className="edit-btn" onClick={() => handleEdit(mark.id, mark.value)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteMark(mark.id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
