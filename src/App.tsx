import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EditUser from "./pages/EditUser";
import CreateUser from "./pages/CreateUser";

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {isAuthenticated ? (
        <>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/create-user" element={<CreateUser />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
}

export default App;
