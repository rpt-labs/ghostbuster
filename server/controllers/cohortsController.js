const cohorts = require('../config/cohorts');
const cohortNames = Object.keys(cohorts);

exports.getCohorts = (req, res) => {
  const sprintCohorts = cohortNames
    .filter(cohort => cohorts[cohort].phase === 'sprint')
    .map(cohort => {
      return {name: cohort.toUpperCase()}
    });
  const projectCohorts = cohortNames
    .filter(cohort => cohorts[cohort].phase === 'project')
    .map(cohort => {
      return {name: cohort.toUpperCase()}
    });
  res.send({ sprintCohorts, projectCohorts });
};

exports.createCohort = (req, res) => {
  res.send("add functionality to create a cohort");
};

exports.updateCohort = (req, res) => {
  res.send("add functionality to update a cohort");
};

exports.deleteCohort = (req, res) => {
  res.send("add functionality to delete a cohort");
};

exports.getStudents = (req, res) => {
  const { cohort } = req.query;
  res.send(cohorts[cohort]['students']);
};

exports.createStudent = (req, res) => {
  res.send("add functionality to create a student");
};

exports.updateStudent = (req, res) => {
  res.send("add functionality to update a student");
};

exports.deleteStudent = (req, res) => {
  res.send("add functionality to delete a student");
};
