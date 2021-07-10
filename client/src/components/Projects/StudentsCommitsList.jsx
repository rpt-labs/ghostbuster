import { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Segment } from 'semantic-ui-react';
import SelectOptions from './SelectOptions';
import TeamDetails from './TeamDetails';

export default class StudentsCommitsList extends Component {
  state = {
    showAllCommits: false,
    shouldDisplayByWeek: false
  };

  showHideDetails = () => {
    const { showAllCommits } = this.state;
    this.setState({ showAllCommits: !showAllCommits });
  };

  handleSelect = () => {
    const { shouldDisplayByWeek } = this.state;
    this.setState({ shouldDisplayByWeek: !shouldDisplayByWeek });
  };

  render() {
    const { studentsList, commitDetails, selectedCohort, projectPhase } = this.props;
    const { showAllCommits, shouldDisplayByWeek } = this.state;
    return (
      <div>
        <Segment basic style={{ display: 'flex', flexDirection: 'row' }}>
          <Button
            color="grey"
            onClick={() => this.showHideDetails()}
            style={{ marginBottom: '10px' }}
          >
            {showAllCommits ? 'Hide Details' : 'Show Details'}
          </Button>
          {!showAllCommits && (
            <SelectOptions
              style={{ float: 'right', marginLeft: '60%', marginTop: '10px' }}
              handleSelect={() => this.handleSelect()}
              shouldDisplayByWeek={shouldDisplayByWeek}
            />
          )}
        </Segment>
        <br />
        <TeamDetails
          studentsList={studentsList}
          showAllCommits={showAllCommits}
          commitDetails={commitDetails}
          selectedCohort={selectedCohort}
          shouldDisplayByWeek={shouldDisplayByWeek}
          projectPhase={projectPhase}
        />
      </div>
    );
  }
}

StudentsCommitsList.propTypes = {
  studentsList: PropTypes.instanceOf(Array).isRequired,
  selectedCohort: PropTypes.string.isRequired,
  commitDetails: PropTypes.instanceOf(Object).isRequired,
  projectPhase: PropTypes.string.isRequired
};
