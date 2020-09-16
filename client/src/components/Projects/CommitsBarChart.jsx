import React from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
export default class CommitsBarChart extends React.Component {
  getCommitData() {
    const { commits } = this.props;
    const commitsWithCalendarDate = commits.map(commit => ({
      name: commit.name,
      date: commit.date.split('T')[0]
    }));
    const numberOfCommitsByDate = {};
    // eslint-disable-next-line no-return-assign
    commitsWithCalendarDate.forEach(commit =>
      numberOfCommitsByDate[commit.date]
        ? (numberOfCommitsByDate[commit.date] += 1)
        : (numberOfCommitsByDate[commit.date] = 1)
    );
    const commitData = {
      labels: Object.keys(numberOfCommitsByDate),
      datasets: [
        {
          label: 'Commits',
          backgroundColor: 'rgba(75,192,192,0.2)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
          data: Object.values(numberOfCommitsByDate)
        }
      ]
    };
    return commitData;
  }

  render() {
    return (
      <Line
        data={this.getCommitData()}
        options={{
          title: {
            display: true,
            text: 'Commits by date',
            fontSize: 20
          },
          legend: {
            display: true,
            position: 'right'
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  min: 0,
                  max: 25
                }
              }
            ]
          }
        }}
      />
    );
  }
}

CommitsBarChart.propTypes = {
  commits: PropTypes.instanceOf(Object).isRequired
};
