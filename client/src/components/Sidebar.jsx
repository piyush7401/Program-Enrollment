import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Sidebar = ({ open, onProgramSelect }) => {
  const [programList, setProgramList] = useState([]);

  useEffect(() => {
    axios.get('/programs/')
      .then(response => setProgramList(response.data))
      .catch(error => console.error('Error fetching program data:', error));
  }, []);

  return (
    <div>
      <h2>Programs</h2>
      <ul>
        {programList.map(program => (
          <li key={program.programid} onClick={() => onProgramSelect(program)}>
            {program.name}
          </li>
        ))}
      </ul>
      {/* Add a button to navigate to the ProgramForm */}
      <Link to="/program-form">
        <button>+</button>
      </Link>
    </div>
  );
};

export default Sidebar;
