const moment = require('moment');

export const getCommitsWithCalendarDate = commits =>
  commits.map(commit => ({
    name: commit.name,
    date: commit.date.split('T')[0]
  }));

export const getDates = numberOfCommitsByDate => {
  const dates = Object.keys(numberOfCommitsByDate);

  const startDate = new Date(dates[0]);
  const endDate = new Date(dates[dates.length - 1]);
  const datesArray = [];

  while (startDate <= endDate) {
    datesArray.push(startDate.toISOString().split('T')[0]);
    startDate.setDate(startDate.getDate() + 1);
  }
  return datesArray;
};

export const getCommitsForDaysInRange = commitsWithCalendarDate => {
  const numberOfCommitsByDate = {};

  // eslint-disable-next-line no-return-assign
  commitsWithCalendarDate.forEach(commit =>
    numberOfCommitsByDate[commit.date]
      ? (numberOfCommitsByDate[commit.date] += 1)
      : (numberOfCommitsByDate[commit.date] = 1)
  );
  const datesArray = getDates(numberOfCommitsByDate);

  const commitsForDaysInRange = {};
  // eslint-disable-next-line no-return-assign
  datesArray.forEach(date =>
    !numberOfCommitsByDate[date]
      ? (commitsForDaysInRange[date] = 0)
      : (commitsForDaysInRange[date] = numberOfCommitsByDate[date])
  );
  return commitsForDaysInRange;
};

export const dataSet = {
  label: 'Commits',
  backgroundColor: 'rgba(75,192,192,0.2)',
  borderColor: 'rgba(75,192,192,1)',
  borderWidth: 2
};

export const getCommitsByDate = numberOfCommitsByDate => {
  return {
    labels: Object.keys(numberOfCommitsByDate),
    datasets: [
      {
        ...dataSet,
        data: Object.values(numberOfCommitsByDate)
      }
    ]
  };
};

export const getCommitsByWeek = numberOfCommitsByDate => {
  const datesArray = getDates(numberOfCommitsByDate);
  const sortedByWeek = datesArray.reduce((res, date) => {
    const count = numberOfCommitsByDate[date];
    const startOfWeek = moment(date, 'YYYY-MM-DD')
      .startOf('week')
      .add(1, 'days');
    // eslint-disable-next-line no-unused-expressions
    res[startOfWeek]
      ? (res[startOfWeek].count += count)
      : (res[startOfWeek] = { date: moment(startOfWeek).format('YYYY-MM-DD'), count });
    return res;
  }, {});

  return {
    labels: Object.keys(sortedByWeek).map(date => new Date(date).toISOString().split('T')[0]),
    datasets: [
      {
        ...dataSet,
        data: Object.values(sortedByWeek).map(value => value.count)
      }
    ]
  };
};

export const getNumberOfCommitsByDate = commits => {
  const commitsWithCalendarDate = getCommitsWithCalendarDate(commits);
  return getCommitsForDaysInRange(commitsWithCalendarDate);
};

export const getCommitDataByDate = commits => {
  const numberOfCommitsByDate = getNumberOfCommitsByDate(commits);
  return getCommitsByDate(numberOfCommitsByDate);
};

export const getCommitDataByWeek = commits => {
  const numberOfCommitsByDate = getNumberOfCommitsByDate(commits);
  return getCommitsByWeek(numberOfCommitsByDate);
};
