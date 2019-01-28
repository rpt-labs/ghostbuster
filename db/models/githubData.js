const { query } = require('../index');

module.exports = {
  saveSprintData: async (data) => {
    try {
      const sprints = Object.keys(data);
      const getSprintId = `SELECT id FROM sprints where sprint_name='${sprints[0]}'`;
      const sprintId = await query(getSprintId);
      const inputData = data[sprints[0]];
      const studentsSprintsData = inputData.map(async (e) => {
        const isForked = e.commitMessages[0] !== 'no fork';
        const getStudentId = `Select id from students where github='${e.github}'`;
        const studentId = await query(getStudentId);
        // delete data from student_sprints table if already exists
        const deleteData = `
          DELETE FROM student_sprints 
          WHERE (${studentId.rows[0].id} = student_id AND ${sprintId.rows[0].id} = sprint_id)`;
        const deleteRows = await query(deleteData);

        // insert data in student_sprints table
        const queryString = `
          INSERT INTO student_sprints (student_id, sprint_id, fork, bmr, percent_complete)
          VALUES (
            ${studentId.rows[0].id}, 
            ${sprintId.rows[0].id},
            ${isForked},
            ${e.BMR},
            ${e.percentComplete}
        ) RETURNING id`;

        const dataInserted = await query(queryString);
        const id = dataInserted.rows[0].id;

        // insert data in student_sprints_commit table
        if (isForked && e.commitMessages.length) {
          e.commitMessages.map(async (message) => {
            const commitMessage = message.toLowerCase();
            const checkIfMilestoneQuery = `
              SELECT * FROM messages WHERE (message_text = '${commitMessage}' AND sprint_id = ${sprintId.rows[0].id})
              `;
            const checkIfMilestone = await query(checkIfMilestoneQuery);
            const ifMilestone = checkIfMilestone.rows.length > 0;
            const insertMsgQuery = `
              INSERT INTO student_sprints_commits (commit_text, is_master, is_milestone, branch_name, student_sprints_id)
              VALUES (
                '${commitMessage}',
                true,
                ${ifMilestone},
                'master',
                ${id}
              )
            `;
            const insertMessage = await query(insertMsgQuery);
          });
        }
      });
    } catch (err) {
      console.log(err.detail || err);
      return err;
    }
  },
};
