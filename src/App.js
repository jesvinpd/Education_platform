import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import SemesterList from './components/SemesterList';
import SubjectList from './components/SubjectList';
import NotesList from './components/NotesList';
import UploadNotes from './components/UploadNotes';

function App() {
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  return (
    <div className="app-container">
      <Header />
      <div className="content">
        <SemesterList
          onSelectSemester={(sem) => {
            setSelectedSemester(sem);
            setSelectedSubject(null);
          }}
          selectedSemester={selectedSemester}
        />

        {selectedSemester && (
          <SubjectList
            semester={selectedSemester}
            onSelectSubject={setSelectedSubject}
            selectedSubject={selectedSubject}
          />
        )}

        {selectedSubject && (
          <div className="notes-section">
            <div className="upload-notes">
              <UploadNotes semester={selectedSemester} subject={selectedSubject} />
            </div>
            <NotesList semester={selectedSemester} subject={selectedSubject} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

