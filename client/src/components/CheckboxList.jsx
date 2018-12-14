import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';
import GhostbusterButton from './GhostbusterButton';

const CheckboxList = (props) => {
  const { repos, handleCheckboxChange, storeCheckedRepos } = props;
  const repoList = repos.map(repo => (
    <Checkbox
      repo={repo}
      handleCheckboxChange={handleCheckboxChange}
      key={`${repo.name}-checkbox`}
    />));

  return (
    <div>
      <div className="ui stackable grid checkboxes">
        {repoList}
        <br />
      </div>
      <GhostbusterButton clickHandler={storeCheckedRepos} />
    </div>
  );
};

CheckboxList.propTypes = {
  repos: PropTypes.arrayOf(Object).isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  storeCheckedRepos: PropTypes.func.isRequired
};

export default CheckboxList;
