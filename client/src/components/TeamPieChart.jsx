import React from 'react';
import { Pie } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const TeamPieChart = (props) => {
  const { students, type } = props;
  const studentNames = Object.keys(students);
  const commits = studentNames.map(student => parseInt(students[student].commitPercentage, 10));
  const changes = studentNames.map(student => parseInt(students[student].changesPercentage, 10));
  const possibleColors = [
    '#2185d0',
    '#403F4C',
    '#F44D63',
    '#85D19C',
    '#FFE65B',
  ];
  const colors = possibleColors.slice(0, studentNames.length);
  const typeData = type === 'commits' ? commits : changes;
  const title = type === 'commits' ? (<h2>Last Week's Commits</h2>) : (<h2>Last Week's Changes</h2>);

  const data = {
    labels: studentNames,
    datasets: [{
      data: typeData,
      backgroundColor: colors,
    }],
  };

  return (
    <div>
      {title}
      <Pie data={data} />
    </div>
  );
};

TeamPieChart.propTypes = {
  students: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default TeamPieChart;
