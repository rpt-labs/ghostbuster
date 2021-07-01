import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

import { getCommitDataByDate, getCommitDataByWeek } from '../../helpers/ProjectsHelpers';

// eslint-disable-next-line react/prefer-stateless-function
const CommitsLineChart = props => {
  const { commits, shouldDisplayByWeek } = props;
  const lineChartConfig = {
    byDate: {
      data: getCommitDataByDate(commits),
      max: 30,
      text: 'Commits by date'
    },
    byWeek: {
      data: getCommitDataByWeek(commits),
      max: 80,
      text: 'Commits by week'
    }
  };
  const { data, max, text } = shouldDisplayByWeek ? lineChartConfig.byWeek : lineChartConfig.byDate;

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
};

export default CommitsLineChart;

CommitsLineChart.propTypes = {
  commits: PropTypes.instanceOf(Object).isRequired,
  shouldDisplayByWeek: PropTypes.bool.isRequired
};
