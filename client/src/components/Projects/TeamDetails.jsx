import { Card, Segment, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import StudentDetailCard from './StudentDetailCard';
import TeamCommitsBarChart from './TeamCommitsBarChart';

const TeamDetails = ({
  studentsList,
  showAllCommits,
  commitDetails,
  selectedCohort,
  shouldDisplayByWeek
}) => {
  const groupedList = _.groupBy(studentsList, 'fecTeam');
  return (
    <>
      {Object.keys(groupedList).map(group => (
        <Segment padded>
          <Header as="h1">{`Team: ${group}`}</Header>
          {!showAllCommits && (
            <div style={{ width: '70%', margin: '0 auto', marginBottom: '24px' }}>
              <TeamCommitsBarChart
                students={groupedList[group]}
                commitDetails={commitDetails}
                selectedCohort={selectedCohort}
                shouldDisplayByWeek={shouldDisplayByWeek}
              />
            </div>
          )}
          <Card.Group itemsPerRow={2} key={group}>
            {groupedList[group].map(studentInfo => (
              <StudentDetailCard
                studentInfo={studentInfo}
                showAllCommits={showAllCommits}
                commitDetails={commitDetails}
                selectedCohort={selectedCohort}
                shouldDisplayByWeek={shouldDisplayByWeek}
                key={studentInfo.github}
              />
            ))}
          </Card.Group>
        </Segment>
      ))}
    </>
  );
};

export default TeamDetails;

TeamDetails.propTypes = {
  studentsList: PropTypes.instanceOf(Array).isRequired,
  showAllCommits: PropTypes.bool.isRequired,
  selectedCohort: PropTypes.string.isRequired,
  commitDetails: PropTypes.instanceOf(Object).isRequired,
  shouldDisplayByWeek: PropTypes.bool.isRequired
};
