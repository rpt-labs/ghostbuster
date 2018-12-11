const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
} = require('graphql');
const cohorts = require('../../db/models/cohorts');

//db
const { query } = require('../../db/index');

const CohortType = new GraphQLObjectType({
  name: 'Cohort',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    phase: { type: GraphQLString },
    students: {
      type: new GraphQLList(StudentType),
      resolve(parent, args) {
        return query(`
          SELECT * FROM students WHERE cohort_id=${parent.id}
          ORDER BY id ASC
        `)
          .then(result => result.rows)
          .catch(error => error.detail);
      }
    },
    teams: {
      type: new GraphQLList(TeamType),
      resolve(parent, args) {
        return query(`
          SELECT * FROM teams WHERE cohort_id=${parent.id}
          ORDER BY id ASC
        `)
          .then(result => result.rows)
          .catch(error => error.detail);
      }
    }
  }),
});

const StudentType = new GraphQLObjectType({
  name: 'Student',
  fields: () => ({
    id: { type: GraphQLInt },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    github: { type: GraphQLString },
    cohort: {
      type: CohortType,
      resolve(parent, args) {
        return query(`SELECT * FROM cohorts WHERE id=${parent.cohort_id}`)
          .then(result => result.rows[0])
          .catch(err => err.detail);
      }
    },
    teams: {
      type: new GraphQLList(TeamType),
      resolve(parent, args) {
        return query(`
          SELECT teams.id, teams.team_name, teams.github, teams.cohort_id FROM teams
          JOIN team_student ON(teams.id=team_student.team_id)
          JOIN students ON(students.id=team_student.student_id)
          WHERE student_id=${parent.id}
          ORDER BY id ASC
        `)
          .then(result => result.rows)
          .catch(error => error.detail);
      }
    }
  }),
});

const TeamType = new GraphQLObjectType({
  name: 'Team',
  fields: () => ({
    id: { type: GraphQLInt },
    team_name: { type: GraphQLString },
    github: { type: GraphQLString },
    cohort: {
      type: CohortType,
      resolve(parent, args) {
        return query(`SELECT * FROM cohorts WHERE id=${parent.cohort_id}`)
          .then(result => result.rows[0])
          .catch(error => error.detail);
      }
    },
    team_type: { type: GraphQLString },
    students: {
      type: new GraphQLList(StudentType),
      resolve(parent, args) {
        return query(`
          SELECT
            students.id, students.first_name, students.last_name, students.github, students.cohort_id
          FROM students
          JOIN team_student ON(students.id=team_student.student_id)
          JOIN teams ON(teams.id=team_student.team_id)
          WHERE team_id=${parent.id}
          ORDER BY first_name ASC`
        ).then(res => res.rows)
         .catch(err => console.log(err.details));
      }
    }
  }),
});

const SprintType = new GraphQLObjectType({
  name: 'Sprint',
  fields: () => ({
    id: { type: GraphQLInt },
    sprint_name: { type: GraphQLString },
    messages: {
      type: new GraphQLList(CommitMessageType),
      resolve(parent, args) {
        return query(`
          SELECT * from messages WHERE sprint_id=${parent.id}
          ORDER BY id ASC
        `).then(result => result.rows)
          .catch(error => error.detail || error);
      }
    }
  }),
});

const CommitMessageType = new GraphQLObjectType({
  name: 'CommitMessage',
  fields: () => ({
    id: { type: GraphQLInt },
    message_text: { type: GraphQLString },
    sprint: {
      type: SprintType,
      resolve(parent, args) {
        return query(`
        SELECT * from sprints WHERE id=${parent.sprint_id}
        ORDER BY id ASC
        `)
          .then(result => result.rows)
          .catch(error => error.detail || error);
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    cohort: {
      type: CohortType,
      args: {id: { type: GraphQLInt }},
      resolve(parent, args) {
        return query(`SELECT * FROM cohorts WHERE id=${args.id}`)
          .then(result => result.rows[0])
          .catch(error => error.detail);
      }
    },
    student: {
      type: StudentType,
      args: {id: { type: GraphQLInt }},
      resolve(parent, args) {
        return query(`SELECT * FROM students WHERE id=${args.id}`)
          .then(result => result.rows[0])
          .catch(error => error.detail);
      }
    },
    team: {
      type: TeamType,
      args: {id: { type: GraphQLInt }},
      resolve(parent, args) {
        return query(`SELECT * FROM teams WHERE id=${args.id}`)
          .then(result => result.rows[0])
          .catch(error => error.detail);
      }
    },
    sprint: {
      type: SprintType,
      args: {id: { type: GraphQLInt }},
      resolve(parent, args) {
        return query(`SELECT * FROM sprints WHERE id=${args.id}`)
          .then(result => result.rows[0])
          .catch(error => error.detail || error);
      }
    },
    cohorts: {
      type: new GraphQLList(CohortType),
      resolve(parent, args) {
        return query(`SELECT * FROM cohorts ORDER BY id ASC`)
          .then(result => result.rows)
          .catch(error => error.detail);
      }
    },
    students: {
      type: new GraphQLList(StudentType),
      resolve(parent, args) {
        return query(`SELECT * FROM students ORDER BY first_name ASC`)
          .then(result => result.rows)
          .catch(error => error.detail);
      }
    },
    teams: {
      type: new GraphQLList(TeamType),
      resolve(parent, args) {
        return query(`SELECT * FROM teams ORDER BY id ASC`)
          .then(result => result.rows)
          .catch(error => error.detail);
      }
    },
    sprints: {
      type: new GraphQLList(SprintType),
      resolve(parent, args) {
        return query(`SELECT * FROM sprints ORDER BY id ASC`)
          .then(result => result.rows)
          .catch(error => error.detail || error);
      }
    }
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createCohort: {
      type: CohortType,
      args: {
        name: { type: GraphQLString },
        phase: { type: GraphQLString },
      },
      resolve(parent, args) {
        let { name, phase } = args;
        name = name.toLowerCase();
        return cohorts.addCohort({ name, phase })
          .then((result) => {
            return { id: result.cohort_id, name: result.cohort_name, phase: result.phase }
          })
          .catch(error => error.detail || error);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
