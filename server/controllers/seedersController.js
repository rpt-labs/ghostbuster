const seeders = require('../../db/models/seeders');

// cohorts
const { allCohorts } = require('../config/cohorts');

// students
const { students } = require('../config/students');

// sprints
const { allSprints } = require('../config/sprints');

// teams
const { allTeams, teamStudents } = require('../config/teams');

module.exports = async function seedDatabase(req, res) {
  const { seedType } = req.params;
  switch (seedType) {
    case 'cohorts':
      const addedCohorts = await seeders.seedCohorts(allCohorts);
      res.status(200).json({ success: addedCohorts });
      break;
    case 'students':
      const addedStudents = await seeders.seedStudents(students);
      res.status(200).json({ success: addedStudents });
      break;
    case 'sprints':
      const sprints = await seeders.seedSprints(allSprints);
      res.status(200).json({ success: sprints });
      break;
    case 'teams':
      const teams = await seeders.seedTeams(allTeams);
      res.status(200).json({ success: teams });
      break;
    case 'teamstudent':
      const addedRecords = await seeders.seedTeamStudent(teamStudents);
      res.status(200).json({ message: addedRecords });
      break;
    default:
      res.status(400).json({ error: 'Invalid seed type' });
  }
};
