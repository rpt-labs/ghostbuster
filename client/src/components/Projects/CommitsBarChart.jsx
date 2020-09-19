import React from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

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
    const dates = Object.keys(numberOfCommitsByDate);

    const startDate = new Date(dates[0]);
    const endDate = new Date(dates[dates.length - 1]);
    const datesArray = [];

    while (startDate <= endDate) {
      datesArray.push(startDate.toISOString().split('T')[0]);
      startDate.setDate(startDate.getDate() + 1);
    }
    const commitsForDaysInRange = {};
    // eslint-disable-next-line no-return-assign
    datesArray.forEach(date =>
      !numberOfCommitsByDate[date]
        ? (commitsForDaysInRange[date] = 0)
        : (commitsForDaysInRange[date] = numberOfCommitsByDate[date])
    );

    const commitData = {
      labels: Object.keys(commitsForDaysInRange),
      datasets: [
        {
          label: 'Commits',
          backgroundColor: 'rgba(75,192,192,0.2)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 2,
          data: Object.values(commitsForDaysInRange)
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
                  max: 20
                }
              }
            ]
          },
          elements: {
            point: {
              radius: 0
            }
          }
        }}
      />
    );
  }
}

CommitsBarChart.propTypes = {
  commits: PropTypes.instanceOf(Object).isRequired
};
