// db
const students = require('../../db/models/students');
const cohorts = require('../../db/models/cohorts');

// config files (if you don't want to set up a local DB)
const allCohortsConfig = require('../config/cohorts').allCohorts;

// COHORT requests TODO: error handling for all functions, delete functionality

// Uncomment either line 13 or lines 16-20, depending on whether you want front use the db or config files
exports.getCohorts = async (req, res) => {
  // for using DB and GraphQL
  // const allCohorts = await cohorts.getAllCohorts();

  // for using config files only
  let allCohorts = allCohortsConfig;
  allCohorts = allCohorts.map((cohort) => {
    cohort.cohort_name = cohort.name;
    return cohort;
  });

  res.send({ data: { cohorts: allCohorts } });
};

exports.createCohort = async (req, res) => {
  // eslint-disable-next-line prefer-const
  let { name, phase } = req.query;
  // needs to be lower case for repo-matching
  name = name.toLowerCase();
  const newCohort = await cohorts.addCohort({ name, phase });

  if (newCohort.name === 'error') {
    res.status(400).json({ error: newCohort.detail });
  } else {
    res.status(200).json({ cohort: newCohort });
  }
};

exports.updateCohort = async (req, res) => {
  const { cohortId, cohortName, phase } = req.query;
  const updated = await cohorts.updateCohort(cohortId, { cohortName, phase });
  if (updated.name === 'error') {
    res.status(400).json({ error: updated.detail });
  } else {
    res.status(200).json({ cohort: updated });
  }
};

exports.deleteCohort = (req, res) => {
  res.send('add functionality to delete a cohort');
};

// STUDENT requests
exports.getStudents = async (req, res) => {
  const { cohortId } = req.query;
  const studentData = cohortId
    ? await students.getStudentsByCohort(cohort_id)
    : await students.getAllStudents();

  if (studentData.length) {
    res.status(200).json({ students: studentData });
  } else {
    res.status(400).json({ error: 'error retrieving students.  check that cohort_id is a valid cohort id' });
  }
};

exports.createStudent = async (req, res) => {
  const {
    firstName, lastName, github, cohortId,
  } = req.query;
  const student = await students.addStudent({
    firstName, lastName, github, cohortId,
  });
  if (student.name === 'error') {
    res.status(400).json({ error: student.detail });
  } else {
    res.status(200).json({ student });
  }
};

exports.updateStudent = async (req, res) => {
  const {
    id, firstName, lastName, github, cohortId,
  } = req.query;
  const updated = await students.updateStudent(id, {
    firstName,
    lastName,
    github,
    cohortId,
  });

  if (updated.name === 'error') {
    res.status(400).json({ error: 'error updating student' });
  } else {
    res.status(200).json({ student: updated });
  }
};

exports.deleteStudent = (req, res) => {
  res.send('add functionality to delete a student');
};
