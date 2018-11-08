//db
const students = require('../../db/models/students');
const cohorts = require('../../db/models/cohorts');

//COHORT requests TODO: error handling for all functions, delete functionality
exports.getCohorts = async(req, res) => {
  const allCohorts = await cohorts.getAllCohorts();
  const sprintCohorts = allCohorts.filter(cohort => cohort.phase === 'sprint');
  const teamCohorts = allCohorts.filter(cohort => cohort.phase === 'project');
  res.send({ sprintCohorts, teamCohorts });
};

exports.createCohort = async(req, res) => {
  let { cohort_name, phase } = req.query;
  //needs to be lower case for repo-matching
  cohort_name = cohort_name.toLowerCase();
  const newCohort = await cohorts.addCohort({ cohort_name, phase });

  if (newCohort.name === 'error') {
    res.status(400).json({error: newCohort.detail});
  } else {
    res.status(200).json({cohort: newCohort});
  }
};

exports.updateCohort = async(req, res) => {
  const { cohort_id, cohort_name, phase } = req.query;
  const updated = await cohorts.updateCohort(cohort_id, { cohort_name, phase });
  if (updated.name === 'error') {
    res.status(400).json({error: updated.detail});
  } else {
    res.status(200).json({cohort: updated});
  }
};

exports.deleteCohort = (req, res) => {
  res.send("add functionality to delete a cohort");
};

//STUDENT requests
exports.getStudents = async(req, res) => {
  const { cohort_id } = req.query;
  let studentData= cohort_id
    ? await students.getStudentsByCohort(cohort_id)
    : await students.getAllStudents();

  if (studentData.length) {
    res.status(200).json({students: studentData});
  } else {
    res.status(400).json({error: "error retrieving students.  check that cohort_id is a valid cohort id"});
  }
};

exports.createStudent = async(req, res) => {
  const { first_name, last_name, github, cohort_id } = req.query;
  let student = await students.addStudent({ first_name, last_name, github, cohort_id});

  if (student.name==="error") {
    res.status(400).json({error: student.detail});
  } else {
    res.status(200).json({student});
  }
};

exports.updateStudent = async(req, res) => {
  const { id, first_name, last_name, github, cohort_id } = req.query;
  let updated = await students.updateStudent(id, {
    first_name,
    last_name,
    github,
    cohort_id
  });

  if (updated.name === 'error') {
    res.status(200).json({error: "error updating student"});
  } else {
    res.status(200).json({student: updated});
  }
};

exports.deleteStudent = (req, res) => {
  res.send("add functionality to delete a student");
};
