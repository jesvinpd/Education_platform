import React, { useEffect, useState } from 'react';
import axios from 'axios';

function NotesList({ semester, subject }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (semester && subject) {
      axios.get(`http://localhost:8000/api/notes/filter/${semester}/${subject}/`)
        .then(response => setNotes(response.data))
        .catch(error => console.error('Error fetching notes:', error));
    } else {
      setNotes([]); // Clear list if no semester/subject
    }
  }, [semester, subject]);

  return (
    <div className="notes-list" style={{ padding: '20px' }}>
      <h3>Notes for Semester {semester} - {subject}</h3>
      {notes.length > 0 ? (
        <ul>
          {notes.map(note => (
            <li key={note.id} style={{ marginBottom: '10px' }}>
              <strong>{note.title}</strong> <br />
              <a
                href={`http://localhost:8000${note.file}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View PDF
              </a>
              &nbsp;|&nbsp;
              <a
                href={`http://localhost:8000${note.file}`}
                download
              >
                Download
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notes available.</p>
      )}
    </div>
  );
}

export default NotesList;
