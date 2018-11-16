const { query } = require('../index');

module.exports = {
  addTeam: (team, cohort_id) => {
    return query(`
      INSERT INTO teams (team_name, team_type, github, cohort_id)
      VALUES (
        '${team.team_name}',
        '${team.team_type}',
        '${team.github}',
        ${cohort_id}
      )`
    ).then(res => {
      return query(`
        SELECT * FROM teams WHERE team_name='${team.team_name}'
      `).then(res => res.rows[0])
        .catch(err => err);
    }).catch(err => err)
  },
  addStudentToTeam: async(studentId, teamId) => {
    //TODO:  don't add a student record twice to the same team
    let existingRecord;
    try {
      existingRecord = await query(`
        SELECT * FROM team_student WHERE student_id=${studentId} AND team_id=${teamId}
      `);
    if (existingRecord.rows.length) {
      return "student is already part of this team";
    }
    } catch(error) {
      console.log(error);
    }
    try {
      let teamStudentRecord = await query(`
        INSERT INTO team_student (team_id, student_id)
        VALUES (${teamId}, ${studentId})
      `);
      if (teamStudentRecord.rowCount) {
        let team = await module.exports.getTeamById(teamId);
        return {success: `added student to team ${team.team_name}`}
      }
      console.log(teamStudentRecord);
      return teamStudentRecord;
    } catch(error) {
      console.log(error);
      return error;
    }
  },
  removeStudentFromTeam: async(studentId, teamId) => {
    try {
      let deleted = await query(`
        DELETE FROM team_student
        WHERE student_id=${studentId}
        AND team_id=${teamId}
      `);
      if (deleted.rowCount) {
        return "Student was removed from team";
      } else {
        return "Student is not part of this team";
      }
    } catch(error) {
      console.log(error);
    }
  },
  updateTeam: async(teamId, newTeamInfo) => {
    //update team
    try {
      let update = await query(`
      UPDATE teams SET (team_name, team_type, github, cohort_id) = (
        '${newTeamInfo.team_name}',
        '${newTeamInfo.team_type}',
        '${newTeamInfo.github}',
        ${newTeamInfo.cohort_id}
      ) WHERE id = ${teamId}
    `);
    if (update.rowCount) {
      console.log(`Updated team ${teamId}`)
    } else {
      return "unable to update cohort record"
    }
    } catch (error) {
      console.log(error);
      return error;
    }

    //retrieve updated cohort
    try {
      let team = await module.exports.getTeamById(teamId);
      return team;
    } catch(error) {
      console.log(error);
      return error;
    }
  },
  getAllTeams: async() => {
    try {
      const teamQuery = await query(`SELECT * FROM teams ORDER BY id ASC`);
      return teamQuery.rows;
    } catch(err) {
      console.log(err.detail || err);
      return err;
    }
  },
  getTeamById: async(teamId) => {
    try {
      let team = await query(`SELECT * FROM teams WHERE id=${teamId}`);
      return team.rows[0]
    } catch(err) {
      console.log(err);
      return err;
    }
  },
  getStudentsByTeamId: async(teamId) => {
    try {
      studentQuery = await query(`
        SELECT
          students.id,
          students.first_name,
          students.last_name,
          students.github,
          students.cohort_id
        FROM students
        JOIN team_student ON(students.id=team_student.student_id)
        JOIN teams ON(teams.id=team_student.team_id)
        WHERE team_id=${teamId}
        ORDER BY first_name ASC`
      );

      return studentQuery.rows;
    } catch(error) {
      console.log(error);
    }
  },
  getTeamWithStudents: async(teamId) => {
    let team;
    let students;
    //retrieve team
    try {
      team = await module.exports.getTeamById(teamId);
    } catch(error) {
      console.log(error)
    }

    //retrive related students
    try {
      students = await module.exports.getStudentsByTeamId(teamId);
    } catch(error) {
      console.log(error);
    }

    return { team, students }
  }
};
