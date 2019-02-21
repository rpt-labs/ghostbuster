import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from 'semantic-ui-react';

const TabNav = props => {
  const { cohorts, selectCohort } = props;
  const panes = cohorts.map(cohort => ({ menuItem: cohort.name }));
  const handleChange = e => selectCohort(e);

  return <Tab panes={panes} onTabChange={handleChange} />;
};

TabNav.propTypes = {
  cohorts: PropTypes.instanceOf(Object).isRequired,
  selectCohort: PropTypes.func.isRequired
};

export default TabNav;
