//github project checking utils
const ghostBustWeek = require('../helpers/teamGhostbusterWeek');
const ghostBustLifetime = require('../helpers/teamGhostbusterLifetime');

//db
const teams = require('../../db/models/teams');

//TEAMS requests TODO: delete functionality
exports.getTeams = async(req, res) => {
  const { cohort_id } = req.query;
  let studentData = cohort_id
    ? await teams.getTeamsByCohort(cohort_id)
    : await teams.getAllTeams();

  if (studentData.length) {
    res.status(200).json({students: studentData});
  } else {
    res.status(400).json({error: "error retrieving students.  check that cohort_id is a valid cohort id"});
  }
};

exports.createTeam = async(req, res) => {
  const { team_name, team_type, github, cohort_id } = req.query;
  let team = await teams.addTeam({ team_name, team_type, github}, cohort_id);

  if (team.name==="error") {
    res.status(400).json({error: team.detail || team});
  } else {
    res.status(200).json({team});
  }
};

exports.updateTeam = async(req, res) => {
  const { teamId, team_name, team_type, github, cohort_id } = req.query;
  let updated = await teams.updateTeam(teamId, {
    team_name,
    team_type,
    github,
    cohort_id
  });

  if (updated.name === 'error') {
    res.status(200).json({error: "error updating student"});
  } else {
    res.status(200).json({student: updated});
  }
};

exports.deleteTeam = (req, res) => {
  res.send("add functionality to delete a team");
};

//TEAM_STUDENT requests TODO: error handling for all functions
exports.addStudentsToTeam = async(req, res) => {
  const { teamId, studentId } = req.params;
  let added = await teams.addStudentToTeam(studentId, teamId);
  res.json({message: added});
};

exports.removeStudentFromTeam = async(req, res) => {
  const { teamId, studentId } = req.params;
  let removed = await teams.removeStudentFromTeam(studentId, teamId);
  res.json({message: removed});
};

exports.getTeamStudents = async(req, res) => {
  const { teamId } = req.params;
  const students = await teams.getStudentsByTeamId(teamId);

  if (students.name === 'error') {
    res.status(400).json({error: students.detail || students});
  } else {
    res.status(200).json({ students });
  }
};

//check last week's project phase

//TODO: create redis store.  first check redis store to see if that week's data is there
//only call ghostBust function if it's not in redis, it takes ~40 seconds to run!
exports.getTeamGithubData = async(req, res, next) => {
  let { cohort } = req.params;
  let report = await ghostBustWeek(cohort);
  res.send(report);
}

//check lifetime contribution by cohort.
exports.getLifetimeContributionData = async(req, res, next) => {
  const { cohort, teamType } = req.params;
  let report = await ghostBustLifetime(teamType, cohort);
  res.send(report);
};
