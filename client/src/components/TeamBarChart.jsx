import React from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const TeamBarChart = (props) => {
  const { contributions } = props;
  const students = Object.keys(contributions);
  const commits = students.map(student => contributions[student].percentage);
  console.log(students, commits);
  const data = {
    labels: students,
    datasets: [
      {
        label: 'Lifetime Percent of Commits',
        backgroundColor: 'rgba(133, 209, 156,0.5)',
        borderColor: 'rgba(133, 209, 156,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(133, 209, 156,0.8)',
        hoverBorderColor: 'rgba(133, 209, 156,1)',
        data: commits
      }
    ]
  };
  // const data = {
  //   labels: "Lifetime commits",
  //   dataSets: [
  //     {
  //       backgroundColor: 'rgba(255,99,132,0.2)',
  //       borderColor: 'rgba(255,99,132,1)',
  //       borderWidth: 1,
  //       hoverBackgroundColor: 'rgba(255,99,132,0.4)',
  //       hoverBorderColor: 'rgba(255,99,132,1)',
  //       data: commits
  //     }
  //   ]
  // };
  if (students.length) {
    return (
      <Bar
        data={data}
        width={50}
        height={25}
      />
    )
  } else {
    return (<h2>This team has no repos</h2>)
  }

};

export default TeamBarChart;


