import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/store";
import Login from "./components/Login";
import MarkEntry from "./components/MarkEntry";

export default function App() {
  const user = useAuthStore((state) => state.user);

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/marks" /> : <Login />} />
      <Route path="/marks" element={user ? <MarkEntry /> : <Navigate to="/" />} />
    </Routes>
  );
}
