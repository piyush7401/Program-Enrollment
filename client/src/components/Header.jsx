import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../context/UserContext';


const Header = ({ onMenuClick }) => {
    const {user} = useContext(UserContext);

  return (
    <div className="header">
      <div className="menu-icon" onClick={onMenuClick}>
        {/* Add your hamburger menu icon */}
        &#9776;
      </div>
      <div>
        <p>
            {user.email}
        </p>
      </div>
    </div>
  )
}


export default Header
