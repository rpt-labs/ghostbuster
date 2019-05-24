import React from 'react';
import PropTypes from 'prop-types';

function StudentPrDetails(props) {
  const { pullRequestsList } = props;
  return (
    <div>
      <br />
      <h1>Selected Cohort: {pullRequestsList[0].cohort.toUpperCase()}</h1>
      {pullRequestsList.map(item => (
        <div key={item.studentName}>
          <div style={{ fontWeight: 'bold' }}>{item.studentName}</div>
          <div>{item.matchedPrs.length ? item.matchedPrs.map(pr => <div>{pr}</div>) : <div />}</div>
          <br />
        </div>
      ))}
    </div>
  );
}

StudentPrDetails.propTypes = {
  pullRequestsList: PropTypes.instanceOf(Array).isRequired
};

export default StudentPrDetails;
