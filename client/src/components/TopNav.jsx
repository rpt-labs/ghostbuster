import React from 'react';
import PropTypes from 'prop-types';

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
              <p className="top-nav-item" onClick={() => handleSelectDisplay('sprints')}>Check Sprints</p>
            </div>
            <div className="middle aligned item">
              <p className="top-nav-item" onClick={() => handleSelectDisplay('projects')}>Check Projects</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TopNav.propTypes = {
  handleSelectDisplay: PropTypes.func.isRequired,
};

export default TopNav;
