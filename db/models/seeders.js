const { query } = require('../index');

module.exports = {
  seedStudents: students => new Promise((resolve, reject) => {
    students.forEach(async (student, index) => {
      const queryString = `
          INSERT INTO students (id, first_name, last_name, github, cohort_id)
          VALUES (
            ${student.id},
            '${student.firstName}',
            '${student.lastName}',
            '${student.github}',
            ${student.cohortId}
        )`;
      try {
        const insert = await query(queryString);
        if (insert.command) {
          console.log(`Inserted student ${student.firstName}`);
        }
        if (index === students.length - 1) {
          try {
            const insertedStudents = await query('SELECT * from students ORDER BY id ASC');
            resolve(insertedStudents.rows);
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        reject(error.detail);
      }
    });
  }),
  seedCohorts: async cohorts => new Promise((resolve, reject) => {
    cohorts.forEach(async (cohort, index) => {
      const queryString = `
          INSERT INTO cohorts (id, cohort_name, phase)
          VALUES (${cohort.id}, '${cohort.name}', '${cohort.phase}')
        `;
      try {
        const insert = await query(queryString);
        if (insert.command) {
          console.log(`Inserted cohort ${cohort.name}`);
        }
        if (index === cohorts.length - 1) {
          try {
            const insertedCohorts = await query('SELECT * from cohorts ORDER BY id ASC');
            resolve(insertedCohorts.rows);
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        reject(error);
        console.log(error.detail);
      }
    });
  }),
  seedMessagesBySprint: async (sprintId, messages) => new Promise((resolve, reject) => {
    messages.forEach(async (message, index) => {
      try {
        const insertedMessage = await query(`
            INSERT INTO messages (message_text, sprint_id)
            VALUES ('${message.message}', ${sprintId})
          `);
        if (insertedMessage.command) {
          console.log('Inserted message');
        }
        if (index === messages.length - 1) {
          resolve(`Finished inserting all messages for sprint ${sprintId}`);
        }
      } catch (error) {
        console.log('error inserting sprint messages', error.detail || error);
        reject(error);
      }
    });
  }),
  seedSprints: sprints => new Promise((resolve, reject) => {
    const sprintNames = Object.keys(sprints);
    sprintNames.forEach(async (sprint, index) => {
      try {
        const id = sprints[sprint].id;
        const messages = sprints[sprint].messages;

        const insertedSprint = await query(`
            INSERT INTO sprints (id, sprint_name) VALUES (${id}, '${sprint}')
          `);

        if (insertedSprint.command) {
          console.log(`Inserted sprint ${sprint}`);
        }
        const inserted = await module.exports.seedMessagesBySprint(id, messages);
        console.log(inserted);

        if (index === sprintNames.length - 1) {
          try {
            const insertedSprints = await query('SELECT * FROM sprints ORDER BY id ASC');
            resolve(insertedSprints.rows);
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log('error inserting sprints', error.detail || error);
        reject(error.detail || error);
      }
    });
  }),
  seedTeams: teams => new Promise((resolve, reject) => {
    teams.forEach(async (team, index) => {
      try {
        const insert = await query(`
            INSERT INTO teams (id, team_name, team_type, github, cohort_id )
            VALUES (${team.id}, '${team.name}', '${team.teamType}', '${team.github}', ${team.cohortId})`);
        if (insert.command) {
          console.log(`Inserted team ${team.name}`);
        }
        if (index === teams.length - 1) {
          try {
            const insertedTeams = await query('SELECT * FROM teams ORDER BY id ASC');
            resolve(insertedTeams.rows);
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error.detail || error);
        reject(error.detail || error);
      }
    });
  }),
  seedTeamStudent: teamStudentRecords => new Promise((resolve, reject) => {
    teamStudentRecords.forEach(async (currentRecord, index) => {
      try {
        const insert = await query(`
            INSERT INTO team_student (id, team_id, student_id)
            VALUES (${currentRecord.id}, ${currentRecord.teamId}, ${currentRecord.studentId})
          `);
        if (insert.command) {
          console.log('Sucess loading team_student record');
        }
        if (index === teamStudentRecords.length - 1) {
          resolve('Inserted all teamStudent records');
        }
      } catch (error) {
        console.log(error.detail || error);
        reject(error.detail || error);
      }
    });
  }),
};
