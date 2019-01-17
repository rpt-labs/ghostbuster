import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';

const TopNav = (props) => {
  const { handleSelectDisplay } = props;
  return (
    <div className="top-nav">
      <div className="ui stackable three column grid">
        <div className="ten wide column">
          <h1 className="top-nav-title">Ghostbuster</h1>
        </div>
        <div className="six wide column">
          <div className="ui horizontal right floated list">
            <div className="middle aligned item">
              <Link style={{ color: 'white', textDecoration: 'none' }} to="/sprints" className="top-nav-item" onClick={() => handleSelectDisplay('sprints')} role="presentation">
              Sprints
              </Link>
            </div>
            <div className="middle aligned item">
              <Link style={{ color: 'white', textDecoration: 'none' }} to="/projects" className="top-nav-item" onClick={() => handleSelectDisplay('projects')} role="presentation">
              Projects
              </Link>
            </div>
            <div className="middle aligned item">
              <Link style={{ color: 'white', textDecoration: 'none' }} to="/projects" className="top-nav-item" onClick={() => props.auth.logout('/sprints')} role="presentation">
              Logout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TopNav.propTypes = {
  handleSelectDisplay: PropTypes.func.isRequired,
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default withAuth(TopNav);
