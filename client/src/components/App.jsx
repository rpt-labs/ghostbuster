import React from 'react';

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
    };
  }

  render() {
    const { cohorts } = this.state;
    return (
      <div className="ui container">
        {cohorts.map(cohort => <h1 key={cohort.name}>{cohort.name}</h1>)}
      </div>);
  }
}
