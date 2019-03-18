import React from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const TeamBarChart = props => {
  const { contributions } = props;
  const students = Object.keys(contributions);
  const commits = students.map(student => contributions[student].numContributions);
  const data = {
    labels: students,
    datasets: [
      {
        label: 'Lifetime Number of Commits',
        backgroundColor: 'rgba(133, 209, 156,0.5)',
        borderColor: 'rgba(133, 209, 156,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(133, 209, 156,0.8)',
        hoverBorderColor: 'rgba(133, 209, 156,1)',
        data: commits
      }
    ]
  };
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            min: 0
          }
        }
      ]
    }
  };

  if (students.length) {
    return <Bar data={data} options={options} width={50} height={25} />;
  }
  return <div />;
};

TeamBarChart.propTypes = {
  contributions: PropTypes.instanceOf(Object).isRequired
};

export default TeamBarChart;
