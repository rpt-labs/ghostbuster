import React from 'react';
import PropTypes from 'prop-types';

// purpose: show meta-data for the team
const TeamCard = (props) => {
  const { data } = props;
  return (
    <div className="team-card">
      <h1>Team Card Here with meta-data</h1>
    </div>
  );
};

TeamCard.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export default TeamCard;
