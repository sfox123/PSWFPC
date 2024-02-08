import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Main from "./components/Main";
import LoginForm from "./components/LoginForm";
import "./style.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/"  element={
          <div>
            <Main />
            <Nav />
          </div>
        }
        />
        </Routes>
    </Router>
  );
}
