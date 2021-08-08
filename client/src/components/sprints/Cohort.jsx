import { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';
import axios from 'axios';
import { TeamSegment } from '../Styles/TeamStyles';
import Repo from './Repo';
import CheckboxList from './CheckboxList';
import TabNav from '../TabNav';
import sprints from '../../../../server/config/sprints';

const { GHOSTBUSTER_BASE_URL } = process.env;
const useApi = true;

const { allSprints } = sprints;
const repositoryList = Object.keys(allSprints).map(sprint => ({ name: sprint, selected: false }));

const getRepoListFromApi = () => {
  axios.get(`${GHOSTBUSTER_BASE_URL}/api/sprints`).then(response => {
    if (response) {
      const repos = Object.keys(allSprints).map(sprint => ({ name: sprint, selected: false }));
      this.setState({ repos });
    }
  });
};

class Cohort extends Component {
  state = {
    repos: useApi ? getRepoListFromApi() : repositoryList
  };

  handleCheckboxChange = repo => {
    const { repos } = this.state;
    const repoCopy = [].concat(repos);

    for (let i = 0; i < repoCopy.length; i += 1) {
      if (repoCopy[i].name === repo) {
        repoCopy[i].selected = !repoCopy[i].selected;
      }
    }
    this.setState({ repos: repoCopy });
  };

  uncheckAll = () => {
    const { repos } = this.state;
    const copy = repos.slice();

    copy.forEach(repo => {
      const repo2 = repo;
      repo2.selected = false;
      return repo2;
    });
    this.setState({ repos: copy });
  };

  storeCheckedRepos = e => {
    e.preventDefault();
    const { repos } = this.state;
    const { repoSelect } = this.props;
    const newArgs = [];

    repos.forEach(repo => {
      if (repo.selected) {
        newArgs.push(repo.name);
      }
    });

    repoSelect(newArgs);
    this.uncheckAll();
  };

  render() {
    const { loading, commits, showSegment, selected, cohorts, selectCohort } = this.props;
    const { repos } = this.state;

    const repoNames = Object.keys(commits);
    const repoList = repoNames.map(repo => (
      <Repo key={repo} name={repo} students={commits[repo]} />
    ));
    const currentStatus = showSegment ? <TeamSegment>{repoList}</TeamSegment> : <div />;

    const viewDetails = loading ? (
      <Segment placeholder>
        <Dimmer active inverted>
          <Loader inverted content="Loading" />
        </Dimmer>
      </Segment>
    ) : (
      currentStatus
    );

    return (
      <Fragment>
        <TabNav selected={selected} cohorts={cohorts} selectCohort={selectCohort} />
        <CheckboxList
          repos={repos}
          handleCheckboxChange={this.handleCheckboxChange}
          storeCheckedRepos={this.storeCheckedRepos}
        />
        {viewDetails}
      </Fragment>
    );
  }
}

Cohort.propTypes = {
  commits: PropTypes.instanceOf(Object).isRequired,
  loading: PropTypes.bool.isRequired,
  showSegment: PropTypes.bool.isRequired,
  repoSelect: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
  cohorts: PropTypes.instanceOf(Array).isRequired,
  selectCohort: PropTypes.func.isRequired
};

export default Cohort;
