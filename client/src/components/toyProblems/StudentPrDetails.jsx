import React from 'react';

function StudentPrDetails(props) {
  const { pullRequestsList } = props;
  return (
    <div>
      <br />
      <h1>Selected Cohort: {pullRequestsList[0].cohort.toUpperCase()}</h1>
      {pullRequestsList.map(item => (
        <div>
          <div style={{ fontWeight: 'bold' }}>{item.studentName}</div>
          <div>
            {item.pullRequests.map(pr => (
              <div>{pr}</div>
            ))}
          </div>
          <br />
        </div>
      ))}
    </div>
  );
}

export default StudentPrDetails;
