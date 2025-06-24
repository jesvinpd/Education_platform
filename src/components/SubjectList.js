import React from 'react';

// You can replace this with an API call to backend
const subjectsBySemester = {
  1: ['Programming', 'Mathematics', 'Physics'],
  2: ['Data Structures', 'Discrete Maths', 'Digital Logic'],
  3: ['Algorithms', 'Operating Systems', 'DBMS'],
  4: ['Computer Networks', 'Theory of Computation', 'Software Engineering'],
  5: ['AI', 'Machine Learning', 'Compiler Design'],
  6: ['Mobile Computing', 'Cloud Computing', 'Web Development'],
  7: ['Cyber Security', 'Big Data', 'Project'],
  8: ['Internship', 'Seminar', 'Elective'],
};

export default function SubjectList({ semester, onSelectSubject, selectedSubject }) {
  const subjects = subjectsBySemester[semester] || [];

  return (
    <div className="subject-list">
      <h2>Subjects - Sem {semester}</h2>
      <ul>
        {subjects.map(subject => (
          <li
            key={subject}
            className={subject === selectedSubject ? 'active' : ''}
            onClick={() => onSelectSubject(subject)}
          >
            {subject}
          </li>
        ))}
      </ul>
    </div>
  );
}
