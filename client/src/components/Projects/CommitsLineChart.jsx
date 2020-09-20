import React from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

import { getCommitData } from '../../helpers/ProjectsHelpers';

// eslint-disable-next-line react/prefer-stateless-function
export default class CommitsLineChart extends React.Component {
  render() {
    const { commits } = this.props;
    const { commitData, commitDataByWeek } = getCommitData(commits);
    const displayByWeek = false;
    const data = displayByWeek ? commitDataByWeek : commitData;
    const max = displayByWeek ? 50 : 20;
    const text = displayByWeek ? 'Commits by week' : 'Commits by date';
    return (
      <Line
        data={data}
        options={{
          title: {
            display: true,
            text,
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
                  max
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

CommitsLineChart.propTypes = {
  commits: PropTypes.instanceOf(Object).isRequired
};
