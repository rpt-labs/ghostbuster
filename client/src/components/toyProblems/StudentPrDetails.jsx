import { useState } from 'react';
import PropTypes from 'prop-types';
import { Label, Card, Icon, Button, Header } from 'semantic-ui-react';
import ReleasedToyProblems from './ReleasedToyProblems';

const StudentPrDetails = ({ pullRequestsList, selectedCohort, releasedToyProblems }) => {
  const [showAllAttemptedToyProblems, setShowAllAttemptedToyProblems] = useState(false);
  const [showHideReleasedTpList, setShowHideReleasedTpList] = useState(false);

  const totalReleasedTp = releasedToyProblems.length;
  const sortedPullRequestsList = pullRequestsList.sort(
    (a, b) => a.matchedFilesCount - b.matchedFilesCount
  );

  const getClassName = item => {
    if (item.matchedFilesCount < totalReleasedTp - 2) {
      return 'negative';
    }
    if (item.matchedFilesCount === totalReleasedTp) {
      return 'positive';
    }
    return '';
  };

  return (
    <div>
      <br />
      {pullRequestsList && pullRequestsList.length ? (
        <div>
          <Header as="h1">
            {`Cohort: ${selectedCohort.toUpperCase()}`}
            <Button
              color="grey"
              style={{ float: 'right', marginRight: '0px' }}
              onClick={() => setShowHideReleasedTpList(!showHideReleasedTpList)}
            >
              {!showHideReleasedTpList
                ? `Released Total: ${totalReleasedTp} - View`
                : `Released Total: ${totalReleasedTp} - Hide`}
            </Button>
            {showHideReleasedTpList && (
              <ReleasedToyProblems releasedToyProblems={releasedToyProblems} />
            )}
          </Header>
          <table className="ui celled very compact table">
            <thead>
              <tr>
                <th>Student</th>
                <th># Attempted</th>
                <th># Not attempted</th>
              </tr>
            </thead>
            <tbody>
              {sortedPullRequestsList.map(item => (
                <tr key={item.studentName} className={getClassName(item)}>
                  <td data-label="Name">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://github.com/hackreactor/${
                        item.cohort
                      }-toy-problems/pulls?q=is:pr+author:${item.studentGithubHandle}`}
                    >
                      {item.studentName}
                    </a>
                  </td>
                  <td data-label="Attempted">{item.matchedFilesCount}</td>
                  <td data-label="Not attempted">
                    {releasedToyProblems.length - item.matchedFilesCount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Header as="h1">
            <Button
              color="grey"
              onClick={() => setShowAllAttemptedToyProblems(!showAllAttemptedToyProblems)}
            >
              {showAllAttemptedToyProblems ? 'Hide Detailed Report' : 'Show Detailed Report'}
            </Button>
            <span
              style={{
                float: 'right',
                marginRight: '0px',
                fontSize: '14px',
                fontWeight: '5',
                color: 'red',
                fontStyle: 'italic'
              }}
            >
              <b>* Red: </b>
              Not attempted
            </span>
          </Header>
          <Card.Group itemsPerRow={2}>
            {sortedPullRequestsList.map(item => (
              <Card key={item.studentName} style={{ marginBottom: '0px' }}>
                <Card.Content style={{ paddingBottom: '0px' }}>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://github.com/hackreactor/${
                      item.cohort
                    }-toy-problems/pulls?q=is:pr+author:${item.studentGithubHandle}`}
                  >
                    <Card.Header style={{ marginBottom: '10px' }}>
                      <Label size="big" color="teal">
                        <Icon name="github" />
                        {item.studentName}
                      </Label>
                      <Label
                        size="big"
                        color="teal"
                        style={{ float: 'right', marginRight: '30px' }}
                      >
                        <Icon name="check" />
                        {item.matchedFilesCount}
                      </Label>
                    </Card.Header>
                  </a>
                  <Card.Description />
                  {!showAllAttemptedToyProblems && (
                    <>
                      <div>
                        {releasedToyProblems &&
                          releasedToyProblems.length &&
                          releasedToyProblems.map(
                            tp =>
                              !item.matchedFileNames.includes(tp.name.toLowerCase()) && (
                                <div key={tp.name}>
                                  <span style={{ color: 'red' }}>{tp.name}</span>
                                  <span
                                    style={{
                                      color: 'grey',
                                      paddingLeft: '5px',
                                      fontStyle: 'italic'
                                    }}
                                  >
                                    {` (${tp.date.split('T')[0]})`}
                                  </span>
                                </div>
                              )
                          )}
                      </div>
                    </>
                  )}
                  {showAllAttemptedToyProblems && (
                    <>
                      <div>
                        {releasedToyProblems &&
                          releasedToyProblems.length &&
                          releasedToyProblems.map(tp =>
                            item.matchedFileNames.includes(tp.name.toLowerCase()) ? (
                              <div style={{ color: 'grey' }} key={tp.name}>
                                {tp.name}
                              </div>
                            ) : (
                              <div key={tp.name}>
                                <span style={{ color: 'red' }}>{tp.name}</span>
                                <span
                                  style={{
                                    color: 'grey',
                                    paddingLeft: '5px',
                                    fontStyle: 'italic'
                                  }}
                                >
                                  {` (${tp.date.split('T')[0]})`}
                                </span>
                              </div>
                            )
                          )}
                      </div>
                    </>
                  )}
                  <br />
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </div>
      ) : (
        <div style={{ margin: '30px', fontSize: '40px', fontWeight: 'bold' }}>
          {`No Pull Request found for ${selectedCohort.toUpperCase()}`}
        </div>
      )}
    </div>
  );
};

export default StudentPrDetails;

StudentPrDetails.propTypes = {
  pullRequestsList: PropTypes.instanceOf(Array).isRequired,
  releasedToyProblems: PropTypes.instanceOf(Array).isRequired,
  selectedCohort: PropTypes.string.isRequired
};
