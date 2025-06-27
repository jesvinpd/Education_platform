import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import DashBoard from "./components/DashBoard";
import Problem from "./components/dashboard/Problem";
import codingProblems from "./dummyData";
import PracticeSection from "./components/dashboard/PracticeSection";

// Lazy load remote components
const NotesApp = lazy(() => import("notesApp/NotesApp"));
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashBoard />}>
          <Route index element={<div>Dashboard Content</div>} />
          <Route
            path="notes"
            element={
              <Suspense fallback={<h1>Loading Notes...</h1>}>
                <NotesApp />
              </Suspense>
            }
          />
          <Route
            path="practice"
            element={<PracticeSection problems={codingProblems} />}
          />
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
