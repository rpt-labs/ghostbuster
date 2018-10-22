import React from 'react';
import PropTypes from 'prop-types';

const TabNav = (props) => {
  const { cohorts, selected, selectCohort } = props;
  const tabs = cohorts.map((cohort) => {
    const style = selected === cohort.name
      ? 'item active'
      : 'item';

    return (
      <div role="presentation" key={cohort.name} className={style} onClick={e => selectCohort(e)}>
        {cohort.name}
      </div>
    );
  });

  return (
    <div className="ui top attached tabular menu">
      {tabs}
    </div>
  );
};

TabNav.propTypes = {
  cohorts: PropTypes.instanceOf(Object).isRequired,
  selected: PropTypes.string.isRequired,
  selectCohort: PropTypes.func.isRequired,
};

export default TabNav;
