import React from 'react';
import PropTypes from 'prop-types';
import Repo from './Repo';
import CheckboxList from './CheckboxList';

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
          name: 'n-queens',
          selected: false,
        },
        {
          name: 'subclass-dance-party',
          selected: false,
        },
        {
          name: 'chatterbox-client',
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
      ],
    };
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.storeCheckedRepos = this.storeCheckedRepos.bind(this);
  }

  handleCheckboxChange(repo) {
    const { repos } = this.state;
    const newRepoList = [].concat(repos);
    const selected = newRepoList.filter(x => x.name === repo)[0];
    selected.selected = !selected.selected;

    this.setState({ repos: newRepoList });
  }

  storeCheckedRepos() {
    const { repos } = this.state;
    const { repoSelect } = this.props;
    const repoCopy = repos.slice();
    const newArgs = [];

    repoCopy.map((repo) => {
      const newCopy = Object.assign(repo);
      if (repo.selected) {
        newArgs.push(repo.name);
        repo.selected = false;
      }
      return newCopy;
    });

    this.setState({ repos: repoCopy }, () => {
      repoSelect(newArgs);
    });
  }

  render() {
    const { loading, commits } = this.props;
    const { repos } = this.state;
    const style = loading
      ? 'ui bottom attached loading tab segment'
      : 'ui bottom attached active tab segment';
    const repoNames = Object.keys(commits);
    const repoList = repoNames.map(repo => <Repo name={repo} students={commits[repo]} />);
    return (
      <div>
        <CheckboxList repos={repos} handleCheckboxChange={this.handleCheckboxChange} storeCheckedRepos={this.storeCheckedRepos} />
        <div className={style}>
          {repoList}
        </div>
      </div>
    );
  }
}

Cohort.propTypes = {
  commits: PropTypes.instanceOf(Object).isRequired,
  loading: PropTypes.bool.isRequired,
  repoSelect: PropTypes.func.isRequired,
};

export default Cohort;
