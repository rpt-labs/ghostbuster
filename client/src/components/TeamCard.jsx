import React from 'react';
import PropTypes from 'prop-types';
import TeamPieChart from './TeamPieChart';

// purpose: show meta-data for the team
const TeamCard = (props) => {
  const { data } = props;
  return (
    <div className="team-card">
      <TeamPieChart type="commits" students={data}/>
      <TeamPieChart type="changes" students={data}/>
    </div>
  );
};

TeamCard.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export default TeamCard;
