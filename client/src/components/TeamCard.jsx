import React from 'react';
import PropTypes from 'prop-types';
import TeamPieChart from './TeamPieChart';
import TeamBarChart from './TeamBarChart';

// purpose: show meta-data for the team
const TeamCard = (props) => {
  const { data, lifetimeContributions } = props;
  const lifetimeChart = lifetimeContributions
    ? <TeamBarChart contributions={lifetimeContributions} />
    : <div />;
  return (
    <div className="ui center aligned grid team-card">
      <div className="row">
        <div className="eight wide column">
          {lifetimeChart}
        </div>
      </div>
      <div className="eight wide column">
        <TeamPieChart type="commits" students={data} />
      </div>
      <div className="eight wide column">
        <TeamPieChart type="changes" students={data} />
      </div>
    </div>
  );
};

TeamCard.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  lifetimeContributions: PropTypes.instanceOf(Object).isRequired
};

export default TeamCard;
