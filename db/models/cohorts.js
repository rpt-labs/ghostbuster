const { query } = require('../index');

module.exports = {
  addCohort: (cohort) => {
    return query(`
      INSERT INTO cohorts (cohort_name, phase)
      VALUES ('${cohort.cohort_name}', '${cohort.phase}')
    `).then(res => {
      return query(`
        SELECT * FROM cohorts WHERE cohort_name='${cohort.cohort_name}'
      `).then(res => res.rows[0])
        .catch(err => err);
    }).catch(err => err)
  },
  updateCohort: async(cohortId, newCohortInfo) => {
    //update cohort
    console.log("In controller");
    try {
      let update = await query(`
        UPDATE cohorts SET (cohort_name, phase) = (
          '${newCohortInfo.cohort_name}',
          '${newCohortInfo.phase}'
        ) WHERE id = ${cohortId}
      `);

      if (update.rowCount) {
        console.log(`Updated cohort ${cohortId}`)
      } else {
        return "unable to update cohort record"
      }
    } catch (error) {
      console.log(error);
      return error;
    }

    //retrieve updated cohort
    try {
      let cohort = await module.exports.getCohortById(cohortId);
      return cohort;
    } catch(error) {
      console.log(error);
      return error;
    }
  },
  getAllCohorts: async() => {
    try {
      const cohortQuery = await query(`SELECT * FROM cohorts ORDER BY id ASC`);
      return cohortQuery.rows;
    } catch(err) {
      console.log(err.detal || err);
      return err;
    }
  },
  getCohortById: async(cohortId) => {
    try {
      let cohort = await query(`SELECT * FROM cohorts WHERE id=${cohortId}`);
      return cohort.rows[0]
    } catch(err) {
      console.log(err);
      return err;
    }
  }
};
