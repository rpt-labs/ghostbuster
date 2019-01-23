import React from 'react';
import PropTypes from 'prop-types';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';
import { TeamSegment } from './Styles/TeamStyles';
import Repo from './Repo';
import CheckboxList from './CheckboxList';
import TabNav from './TabNav';

class Cohort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [
        {
          name: 'underbar-review',
          selected: false,
        },
        {
          name: 'recursion-review',
          selected: false,
        },
        {
          name: 'data-structures',
          selected: false,
        },
        {
          name: 'beesbeesbees',
          selected: false,
        },
        {
          name: 'subclass-dance-party',
          selected: false,
        },
        {
          name: 'n-queens',
          selected: false,
        },
        {
          name: 'chatterbox-client',
          selected: false,
        },
        {
          name: '6ees6ees6ees',
          selected: false,
        },
        {
          name: 'react-components',
          selected: false,
        },
        {
          name: 'recast.ly',
          selected: false,
        },
        {
          name: 'recastly-redux',
          selected: false,
        },
        {
          name: 'chatterbox-server',
          selected: false,
        },
        {
          name: 'cruddy-todo',
          selected: false,
        },
        {
          name: 'sqool',
          selected: false,
        },
        {
          name: 'databases',
          selected: false,
        },
        {
          name: 'shortly-express',
          selected: false,
        },
        {
          name: 'fullstack-review',
          selected: false,
        },
      ],
    };
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.storeCheckedRepos = this.storeCheckedRepos.bind(this);
    this.uncheckAll = this.uncheckAll.bind(this);
  }

  handleCheckboxChange(repo) {
    const { repos } = this.state;
    const repoCopy = [].concat(repos);

    for (let i = 0; i < repoCopy.length; i += 1) {
      if (repoCopy[i].name === repo) {
        repoCopy[i].selected = !repoCopy[i].selected;
      }
    }
    this.setState({ repos: repoCopy });
  }

  uncheckAll() {
    const { repos } = this.state;
    const copy = repos.slice();

    copy.forEach((repo) => {
      const repo2 = repo;
      repo2.selected = false;
      return repo2;
    });
    this.setState({ repos: copy });
  }

  storeCheckedRepos(e) {
    e.preventDefault();
    const { repos } = this.state;
    const { repoSelect } = this.props;
    const newArgs = [];

    repos.forEach((repo) => {
      if (repo.selected) {
        newArgs.push(repo.name);
      }
    });

    repoSelect(newArgs);
    this.uncheckAll();
  }

  render() {
    const {
      loading,
      commits,
      showSegment,
      selected,
      cohorts,
      selectCohort,
    } = this.props;
    const { repos } = this.state;

    const repoNames = Object.keys(commits);
    const repoList = repoNames.map(repo => <Repo key={repo.name} name={repo} students={commits[repo]} />);
    const currentStatus = showSegment ? (
      <TeamSegment>
        {repoList}
      </TeamSegment>
    ) : (<div />);

    const viewDetails = loading
      ? (
        <Segment placeholder>
          <Dimmer active inverted>
            <Loader inverted content="Loading" />
          </Dimmer>
        </Segment>
      )
      : currentStatus;

    return (
      <React.Fragment>
        <TabNav
          selected={selected}
          cohorts={cohorts}
          selectCohort={selectCohort}
        />
        <CheckboxList repos={repos} handleCheckboxChange={this.handleCheckboxChange} storeCheckedRepos={this.storeCheckedRepos} />
        {viewDetails}
      </React.Fragment>
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
  selectCohort: PropTypes.func.isRequired,
};

export default Cohort;
