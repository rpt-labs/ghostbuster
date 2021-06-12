import PropTypes from 'prop-types';
import { Radio } from 'semantic-ui-react';

const Checkbox = props => {
  const { repo, handleCheckboxChange } = props;
  return (
    <div>
      <Radio
        toggle
        label={repo.name}
        checked={repo.selected}
        onChange={() => handleCheckboxChange(repo.name)}
      />
    </div>
  );
};

Checkbox.propTypes = {
  repo: PropTypes.instanceOf(Object).isRequired,
  handleCheckboxChange: PropTypes.func.isRequired
};

export default Checkbox;
