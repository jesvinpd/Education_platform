import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NoteList.css'; // Create this CSS file for styling

const NoteList = ({ semester, subject }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8000/api/notes/filter/${semester}/${subject}/`
        );
        setNotes(response.data);
      } catch (err) {
        setError('Failed to load notes. Please try again.');
        console.error('Error fetching notes:', err);
      } finally {
        setLoading(false);
      }
    };

    if (semester && subject) {
      fetchNotes();
    } else {
      setNotes([]);
    }
  }, [semester, subject]);

  const handleDownload = async (noteId, filename) => {
    try {
      // Option 1: Simple download (works for most cases)
    const downloadUrl = `http://localhost:8000/api/notes/download/${noteId}/`;
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', filename || `note-${noteId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Option 2: Advanced download with progress tracking (uncomment to use)
      /*
      const response = await fetch(downloadUrl);
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename || `note-${noteId}.pdf`;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      */
    } catch (err) {
      setError('Download failed. Please try again.');
      console.error('Download error:', err);
    }
  };

  if (loading) return <div className="loading">Loading notes...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!notes.length) return <div className="empty">No notes available for this subject.</div>;

  return (
    <div className="notes-container">
      <h2 className="notes-header">
        Notes for Semester {semester} - {subject}
      </h2>
      
      <ul className="notes-list">
        {notes.map((note) => {
          const filename = note.file.split('/').pop(); // Extract filename from URL
          const uploadDate = new Date(note.uploaded_at).toLocaleDateString();

          return (
            <li key={note.id} className="note-item">
              <div className="note-info">
                <h3 className="note-title">{note.title}</h3>
                <p className="note-meta">
                  <span>Uploaded: {uploadDate}</span>
                  <span>File: {filename}</span>
                </p>
              </div>
              
              <div className="note-actions">
                <button
                  onClick={() => handleDownload(note.id, filename)}
                  className="download-btn"
                >
                  Download
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NoteList;