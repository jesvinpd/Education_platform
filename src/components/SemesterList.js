import React from 'react';

const semesters = [1,2,3,4,5,6,7,8];

export default function SemesterList({ onSelectSemester, selectedSemester }) {
  return (
    <div className="semester-list">
      <h2>Semesters</h2>
      <ul>
        {semesters.map(sem => (
          <li
            key={sem}
            className={sem === selectedSemester ? 'active' : ''}
            onClick={() => onSelectSemester(sem)}
          >
            Semester {sem}
          </li>
        ))}
      </ul>
    </div>
  );
}
