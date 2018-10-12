import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';

const CheckboxList = (props) => {
  const { repos, handleCheckboxChange, storeCheckedRepos } = props;
  const handleKeyPress = (e) => {
    console.log(e);
  };

  return (
    <div>
      <div className="ui stackable grid checkboxes">
        {
          repos.map(repo => (
            <Checkbox
              repo={repo}
              handleCheckboxChange={handleCheckboxChange}
              key={`${repo.name}-checkbox`}
            />))
        }
        <br />
      </div>
      <div
        className="ui button primary"
        id="getSprints"
        role="presentation"
        onKeyPress={e => handleKeyPress(e)}
        onClick={() => storeCheckedRepos()}
      >
        get sprint data
      </div>
    </div>
  );
};

CheckboxList.propTypes = {
  repos: PropTypes.arrayOf(Object).isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  storeCheckedRepos: PropTypes.func.isRequired,
};

export default CheckboxList;
