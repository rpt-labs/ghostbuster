import PropTypes from 'prop-types';
import { Label, Card, List, Divider } from 'semantic-ui-react';
import CommitsLineChart from './CommitsLineChart';
import StudentCommitDetailsView from './StudentCommitDetailsView';

const StudentDetailCard = ({
  studentInfo,
  showAllCommits,
  commitDetails,
  selectedCohort,
  shouldDisplayByWeek
}) => (
  <Card style={{ marginBottom: '0px' }}>
    <Card.Content style={{ paddingBottom: '10px' }}>
      <Card.Header style={{ marginBottom: '10px' }}>
        <Label size="big" color="teal">{`${studentInfo.firstName} ${studentInfo.lastName}`}</Label>
      </Card.Header>
      <Card.Description>
        <List divided relaxed>
          {studentInfo[`${selectedCohort.split('-').pop()}Urls`].split(',').map(url => (
            <List.Item key={url}>
              <List.Content>
                <List.Header as="a" target="_blank" href={url}>
                  {url.replace('https://github.com/', '')}
                </List.Header>
                <List.Description style={{ fontWeight: 'bold', marginTop: '12px' }}>
                  Total commits:
                  {commitDetails[
                    `${url.replace('https://github.com/', '')}/commits?author=${studentInfo.github}`
                  ] &&
                    commitDetails[
                      `${url.replace('https://github.com/', '')}/commits?author=${
                        studentInfo.github
                      }`
                    ].length}
                </List.Description>
                {!showAllCommits &&
                  commitDetails[
                    `${url.replace('https://github.com/', '')}/commits?author=${studentInfo.github}`
                  ] && (
                    <CommitsLineChart
                      commits={commitDetails[
                        `${url.replace('https://github.com/', '')}/commits?author=${
                          studentInfo.github
                        }`
                      ].sort((a, b) => new Date(a.date) - new Date(b.date))}
                      shouldDisplayByWeek={shouldDisplayByWeek}
                    />
                  )}
                <Divider section />
                {showAllCommits && (
                  <StudentCommitDetailsView
                    commitDetails={commitDetails}
                    url={url}
                    studentInfo={studentInfo}
                  />
                )}
              </List.Content>
            </List.Item>
          ))}
        </List>
      </Card.Description>
    </Card.Content>
  </Card>
);

export default StudentDetailCard;

StudentDetailCard.propTypes = {
  studentInfo: PropTypes.instanceOf(Object).isRequired,
  showAllCommits: PropTypes.bool.isRequired,
  selectedCohort: PropTypes.string.isRequired,
  commitDetails: PropTypes.instanceOf(Object).isRequired,
  shouldDisplayByWeek: PropTypes.bool.isRequired
};
