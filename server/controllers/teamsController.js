// github project checking utils
// const ghostBustWeek = require('../helpers/teamGhostbusterWeek');
// const ghostBustLifetime = require('../helpers/teamGhostbusterLifetime');

// db
const teams = require('../../db/models/teams');

// TEAMS requests TODO: delete functionality
exports.getTeams = async (req, res) => {
  const { cohortId } = req.query;
  const studentData = cohortId ? await teams.getTeamsByCohort(cohortId) : await teams.getAllTeams();

  if (studentData.length) {
    res.status(200).json({ students: studentData });
  } else {
    res
      .status(400)
      .json({ error: 'error retrieving students. Check that cohort_id is a valid cohort id' });
  }
};

exports.createTeam = async (req, res) => {
  const { teamName, teamType, github, cohortId } = req.query;
  const team = await teams.addTeam({
    teamName,
    teamType,
    github,
    cohortId
  });

  if (team.name === 'error') {
    res.status(400).json({ error: team.detail || team });
  } else {
    res.status(200).json({ team });
  }
};

exports.updateTeam = async (req, res) => {
  console.log('req', req)
  const { teamId, teamName, teamType, github, cohortId } = req.query;
  const updated = await teams.updateTeam(teamId, {
    teamName,
    teamType,
    github,
    cohortId
  });

  if (updated.name === 'error') {
    res.status(200).json({ error: 'error updating student' });
  } else {
    res.status(200).json({ team: updated });
  }
};

exports.deleteTeamById = async (req, res) => {
  const { teamId } = req.params;
  const deleted = await teams.deleteTeamById(teamId);
  res.json({ message: deleted });
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

exports.removeAllStudentsFromTeam = async (req, res) => {
  const { teamId } = req.params;
  const removed = await teams.removeStudentsFromTeam(teamId);
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

exports.getTeamsByCohortId = async (req, res) => {
  const { cohortId } = req.params;
  const teamsList = await teams.getTeamsByCohortId(cohortId);
  res.status(200).json({ teamsList });
};
