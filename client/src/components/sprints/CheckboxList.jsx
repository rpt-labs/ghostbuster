import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import Checkbox from './Checkbox';
import GhostbusterButton from './GhostbusterButton';
import { PaddedGrid } from '../Styles/TeamStyles';

const CheckboxList = ({ repos, handleCheckboxChange, storeCheckedRepos }) => {
  const repoList = repos.map(repo => (
    <Grid.Column width={4} key={`${repo.name}-checkbox`}>
      <Checkbox repo={repo} handleCheckboxChange={handleCheckboxChange} />
    </Grid.Column>
  ));

  return (
    <div>
      <PaddedGrid columns={4} padded="vertically">
        {repoList}
        <br />
      </PaddedGrid>
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
