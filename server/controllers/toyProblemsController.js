const checkToyProblems = require('../helpers/toyProblemsChecker');

exports.getToyProblemsData = async (req, res) => {
  const { cohort } = req.query;
  const toyProblemsData = await checkToyProblems(cohort);
  res.json({ toyProblems: toyProblemsData });
};
