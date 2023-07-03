import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.scss';
import Logo from '../../Images/Logo.png';
import { Summarize, Analytics, Campaign } from '@mui/icons-material';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/summary">
        <div className="top">
          <img src={Logo} alt="Logo" className="logo" />
        </div>
      </Link>
      <hr />
      <div className="bottom">
        <p className="title">CHARTS</p>
        <ul className="options">
          <li>
            <Link to="/summary" style={{ textDecoration: 'none' }}>
              <div>
                <Summarize className="icon" />
                <span>Summary</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/analysis" style={{ textDecoration: 'none' }}>
              <div>
                <Analytics className="icon" />
                <span>CSA Analysis</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/alerts" style={{ textDecoration: 'none' }}>
              <div>
                <Campaign className="icon" />
                <span>Alerts</span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;