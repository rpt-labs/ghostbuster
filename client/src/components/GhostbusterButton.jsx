import React from 'react';
import PropTypes from 'prop-types';

const GhostbusterButton = (props) => {
  const { clickHandler } = props;

  return (
    <div id="ghostbuster-button" className="ui center aligned segment">
      <h2 className="ui header">
        <img alt="cute_ghost" className="ui image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8J9vA9QPiEykz90ij9IRaR3tMKt_kqA0Xpoe0Ha35owi_bWLa" />
        <div className="content ghostbuster-button-text">
          Who you gonna call?
        </div>
        <div
          className="ui button primary"
          id="getSprints"
          role="presentation"
          onClick={e => clickHandler(e)}
        >
        GHOSTBUSTER
        </div>
      </h2>
    </div>
  );
};

GhostbusterButton.propTypes = {
  clickHandler: PropTypes.func.isRequired
};

export default GhostbusterButton;
