// github project checking utils
const ghostBustWeek = require('../helpers/teamGhostbusterWeek');
const ghostBustLifetime = require('../helpers/teamGhostbusterLifetime');

// db
const teams = require('../../db/models/teams');

// TEAMS requests TODO: delete functionality
exports.getTeams = async (req, res) => {
  const { cohortId } = req.query;
  const studentData = cohortId
    ? await teams.getTeamsByCohort(cohortId)
    : await teams.getAllTeams();

  if (studentData.length) {
    res.status(200).json({ students: studentData });
  } else {
    res.status(400).json({ error: 'error retrieving students. Check that cohort_id is a valid cohort id' });
  }
};

exports.createTeam = async (req, res) => {
  const {
    teamName, teamType, github, cohortId,
  } = req.query;
  const team = await teams.addTeam({
    teamName, teamType, github, cohortId,
  });

  if (team.name === 'error') {
    res.status(400).json({ error: team.detail || team });
  } else {
    res.status(200).json({ team });
  }
};

exports.updateTeam = async (req, res) => {
  const {
    teamId, teamName, teamType, github, cohortId,
  } = req.query;
  const updated = await teams.updateTeam(teamId, {
    teamName,
    teamType,
    github,
    cohortId,
  });

  if (updated.name === 'error') {
    res.status(200).json({ error: 'error updating student' });
  } else {
    res.status(200).json({ student: updated });
  }
};

exports.deleteTeam = (req, res) => {
  res.send('add functionality to delete a team');
};

// TEAM_STUDENT requests TODO: error handling for all functions
exports.addStudentsToTeam = async (req, res) => {
  const { teamId, studentId } = req.params;
  const added = await teams.addStudentToTeam(studentId, teamId);
  res.json({ message: added });
};

exports.removeStudentFromTeam = async (req, res) => {
  const { teamId, studentId } = req.params;
  const removed = await teams.removeStudentFromTeam(studentId, teamId);
  res.json({ message: removed });
};

exports.getTeamStudents = async (req, res) => {
  const { teamId } = req.params;
  const students = await teams.getStudentsByTeamId(teamId);

  if (students.name === 'error') {
    res.status(400).json({ error: students.detail || students });
  } else {
    res.status(200).json({ students });
  }
};

// check last week's project phase

// TODO: create redis store.  first check redis store to see if that week's data is there
// only call ghostBust function if it's not in redis, it takes ~40 seconds to run!
exports.getTeamGithubData = async (req, res) => {
  const { cohort } = req.params;
  const report = await ghostBustWeek(cohort);
  res.send(report);
};

// check lifetime contribution by cohort.
exports.getLifetimeContributionData = async (req, res) => {
  const { cohort, teamType } = req.params;
  const report = await ghostBustLifetime(teamType, cohort);
  res.send(report);
};
