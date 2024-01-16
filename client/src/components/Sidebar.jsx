// Sidebar.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'antd';  // Import Button from antd

const Sidebar = ({ onProgramSelect }) => {
  const [programList, setProgramList] = useState([]);

  useEffect(() => {
    // Fetch program data from the API (assuming '/programs/' endpoint)
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
  
    </div>
  );
};

export default Sidebar;
