import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/DashBoard";
import Problem from "./components/dashboard/Problem";
import QuestionUpload from "./components/QuestionUpload";
import codingProblems from "./dummyData";
import PracticeSection from "./components/dashboard/PracticeSection";
import AdminSignup from "./AdminSignup";
import PrivateRoute from "./components/PrivateRoute";
import AIAssistant from './components/AIAssistant';


// ✅ Import from src directly (not components)
import Login from "./Login";
import Signup from "./Signup";
import AdminLogin from "./AdminLogin";  

// Lazy load remote components
const NotesApp = lazy(() => import("notesApp/NotesApp"));

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
          {/* Practice section */}
        <Route
          path="/practice"
          element={<PracticeSection problems={codingProblems} />}
        />
         <Route path="/ai-assistant" element={<AIAssistant />} />

        
        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
       <Route path="/admin/login" element={<AdminLogin />} />
<Route path="/admin/signup" element={<AdminSignup />} />
        
        <Route path="/question-upload" element={<QuestionUpload />} />
        <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }>
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
