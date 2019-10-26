const toyProblemsChecker = require('../helpers/toyProblemsChecker');

exports.getToyProblemsData = async (req, res) => {
  const { cohort } = req.query;
  const toyProblemsData = await toyProblemsChecker.checkToyProblems(cohort);
  res.json({ toyProblems: toyProblemsData });
};

exports.getReleasedToyProblems = async (req, res) => {
  const { cohort } = req.query;
  const releasedTps = await toyProblemsChecker.getReleasedToyProblems(cohort);
  res.json({ toyProblems: releasedTps });
};
