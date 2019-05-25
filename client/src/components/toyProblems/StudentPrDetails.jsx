import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'semantic-ui-react';

function StudentPrDetails(props) {
  const { pullRequestsList } = props;
  return (
    <div>
      <br />
      <h1>Selected Cohort: {pullRequestsList[0].cohort.toUpperCase()}</h1>
      {pullRequestsList.map(item => (
        <div key={item.studentName}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://github.com/hackreactor/${
              item.cohort
            }-toy-problems/pulls?q=is:pr+author:${item.studentGithubHandle}`}
          >
            <Label size="big" color="teal">
              {item.studentName}
              <Label.Detail>{item.uniqueMatchedPrCount}</Label.Detail>
            </Label>
          </a>
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
