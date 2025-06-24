import React, { useState } from 'react';
import axios from 'axios';

function UploadNotes({ semester, subject }) {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title || !file) {
      setStatus("Please provide title and file.");
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('semester', semester);
    formData.append('subject', subject);
    formData.append('file', file);

    try {
      await axios.post('http://localhost:8000/api/notes/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setStatus("Upload successful!");
      setTitle('');
      setFile(null);
    } catch (error) {
      console.error(error);
      setStatus("Upload failed.");
    }
  };

  return (
    <form onSubmit={handleUpload} style={{ margin: '20px 0' }}>
      <h4>Upload Notes for Semester {semester} - {subject}</h4>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter note title"
        required
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        required
      />
      <button type="submit">Upload</button>
      <p>{status}</p>
    </form>
  );
}

export default UploadNotes;

