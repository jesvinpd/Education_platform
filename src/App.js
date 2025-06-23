import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import DashBoard from "./components/DashBoard";
import Compiler from "./components/Compiler";
import Problem from "./components/dashboard/Problem";
import codingProblems from "./dummyData";
import PracticeSection from "./components/dashboard/PracticeSection";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/compiler" element={<Compiler />} />
        <Route path="/dashboard" element={<DashBoard />}>
          <Route index element={<div>Dashboard Content</div>} />
          <Route path="notes" element={<div>Notes Content</div>} />
          <Route path="practice" element={<PracticeSection problems={codingProblems} />} />
        </Route>
        <Route
          path="/problem/:id"
          element={<Problem problems={codingProblems} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
