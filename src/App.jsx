import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AddEmployee from "./components/AddEmployee";
import EmpolyList from "./components/EmpolyList";
import Navbar from "./components/Navbar";
import UpdateEmployee from "./components/UpdateEmployee";
import Login from "./components/Login";
import Register from "./components/Regiseter";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* 1. Public Routes: Inhe koi bhi dekh sakta hai */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 2. Protected Routes: Inhe dekhne ke liye login zaroori hai */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <EmpolyList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/EmpolyList"
            element={
              <ProtectedRoute>
                <EmpolyList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addEmployee"
            element={
              <ProtectedRoute>
                <AddEmployee />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editEmployee/:id"
            element={
              <ProtectedRoute>
                <UpdateEmployee />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;