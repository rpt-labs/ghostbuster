import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import Checkbox from './Checkbox';
import GhostbusterButton from './GhostbusterButton';

const CheckboxList = (props) => {
  const { repos, handleCheckboxChange, storeCheckedRepos } = props;
  const repoList = repos.map(repo => (
    <Grid.Column width={4} key={`${repo.name}-checkbox`}>
      <Checkbox
        repo={repo}
        handleCheckboxChange={handleCheckboxChange}
      />
    </Grid.Column>
  ));

  return (
    <div>
      <Grid columns={4} padded="vertically">
        {repoList}
        <br />
      </Grid>
      <GhostbusterButton clickHandler={storeCheckedRepos} />
    </div>
  );
};

CheckboxList.propTypes = {
  repos: PropTypes.arrayOf(Object).isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  storeCheckedRepos: PropTypes.func.isRequired,
};

export default CheckboxList;
