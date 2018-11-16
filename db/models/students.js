const { query } = require('../index');

module.exports = {
  addStudent: (student) => {
    return query(`
      INSERT INTO students (first_name, last_name, github, cohort_id)
      VALUES (
        '${student.first_name}',
        '${student.last_name}',
        '${student.github}',
        ${student.cohort_id}
      )
    `).then(res => {
      return query(`
        SELECT * FROM students WHERE github='${student.github}'
      `).then(res => res.rows[0])
        .catch(err => err);
    }).catch(err => err)
  },
  updateStudent: async(studentId, newStudentInfo) => {
    //update student

    try {
      let update = await query(`
      UPDATE students SET (first_name, last_name, github, cohort_id) = (
        '${newStudentInfo.first_name}',
        '${newStudentInfo.last_name}',
        '${newStudentInfo.github}',
        ${newStudentInfo.cohort_id}
      ) WHERE id = ${studentId}
    `);
    if (update.rowCount) {
      console.log(`Updated student ${studentId}`)
    } else {
      return "unable to update student record"
    }
    } catch (error) {
      console.log(error);
      return error;
    }

    //retrieve updated student
    try {
      let student = await module.exports.getStudentById(studentId);
      return student;
    } catch(error) {
      console.log(error);
      return error;
    }
  },
  getAllStudents: async() => {
    try {
      const studentQuery = await query(`SELECT * FROM students ORDER BY first_name ASC`);
      return studentQuery.rows;
    } catch(err) {
      console.log(err.detal || err);
      return err;
    }
  },
  getStudentById: async(studentId) => {
    try {
      let student = await query(`SELECT * FROM students WHERE id=${studentId}`);
      return student.rows[0]
    } catch(err) {
      console.log(err);
      return err;
    }
  },
  getStudentsByCohort: async(cohortId) => {
    try {
      let studentQuery = await query(`
        SELECT * FROM students WHERE cohort_id=${cohortId}
        ORDER BY id ASC
      `);
      return studentQuery.rows;
    } catch(err) {
      console.log(err);
      return err;
    }
  }
};
