import React from 'react';
import Nav from './Nav';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cohorts: [
        {
          name: 'RPT07',
        },
        {
          name: 'RPT08',
        },
        {
          name: 'RPT09',
        },
        {
          name: 'RPT10',
        },
        {
          name: 'RPT11',
        },
      ],
      selectedCohort: 'RPT07',
    };
    this.handleSelectCohort = this.handleSelectCohort.bind(this);
  }

  handleSelectCohort(e) {
    this.setState({ selectedCohort: e.target.innerHTML });
  }

  render() {
    const { cohorts, selectedCohort } = this.state;
    return (
      <div className="ui container">
        <Nav selected={selectedCohort} cohorts={cohorts} selectCohort={this.handleSelectCohort} />
        {cohorts.map(cohort => <h1 key={cohort.name}>{cohort.name}</h1>)}
      </div>);
  }
}
