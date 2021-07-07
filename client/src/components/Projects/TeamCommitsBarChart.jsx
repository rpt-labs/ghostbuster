import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true
        }
      }
    ]
  }
};

const TeamCommitsBarChart = ({ students, commitDetails, selectedCohort, shouldDisplayByWeek }) => {
  const BarChartData = {
    labels: students.map(student => student.firstName),
    datasets: [
      {
        label: 'Total # of Commits',
        // @note: remove hardcoded values
        data: [12, 19, 3, 5],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ]
  };
  return (
    <>
      <h1 className="title">Team commit details</h1>
      <Bar data={BarChartData} options={options} />
    </>
  );
};

export default TeamCommitsBarChart;
