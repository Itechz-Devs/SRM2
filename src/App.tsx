import { Route, Routes } from "react-router-dom";
import { ResultProvider } from "./context/ResultContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Demo from "./pages/Demo";
import Upload from "./pages/Upload";
import Results from "./pages/Results";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Agriculture from "./pages/applications/Agriculture";
import Disaster from "./pages/applications/Disaster";
import Urban from "./pages/applications/Urban";
import Forestry from "./pages/applications/Forestry";
import Infrastructure from "./pages/applications/Infrastructure";

export default function App() {
  return (
    <AuthProvider>
      <ResultProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/demo"
            element={
              <ProtectedRoute>
                <Demo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <Upload />
              </ProtectedRoute>
            }
          />
          <Route
            path="/results"
            element={
              <ProtectedRoute>
                <Results />
              </ProtectedRoute>
            }
          />
          <Route path="/applications/agriculture" element={<Agriculture />} />
          <Route path="/applications/disaster" element={<Disaster />} />
          <Route path="/applications/urban" element={<Urban />} />
          <Route path="/applications/forestry" element={<Forestry />} />
          <Route path="/applications/infrastructure" element={<Infrastructure />} />
        </Routes>
      </ResultProvider>
    </AuthProvider>
  );
}
