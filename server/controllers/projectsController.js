const projectsChecker = require('../helpers/projectsChecker');

exports.getStudentsList = async (req, res) => {
  const { cohort } = req.query;
  const studentsList = await projectsChecker.getStudentsList(cohort);
  res.json({ studentsList });
};
