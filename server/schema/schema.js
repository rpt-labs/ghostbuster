/* eslint-disable no-use-before-define */
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');
const cohorts = require('../../db/models/cohorts');
const students = require('../../db/models/students');
const sprints = require('../../db/models/sprints');
const teams = require('../../db/models/teams');
const toyProblems = require('../helpers/toyProblemsChecker');

// db
const { query } = require('../../db/index');

const CohortType = new GraphQLObjectType({
  name: 'Cohort',
  fields: () => ({
    id: { type: GraphQLInt },
    cohortName: { type: GraphQLString },
    phase: { type: GraphQLString },
    status: { type: GraphQLString },
    students: {
      type: new GraphQLList(StudentType),
      resolve(parent) {
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
      resolve(parent) {
        return query(`
          SELECT * FROM teams WHERE cohort_id=${parent.id}
          ORDER BY id ASC
        `)
          .then(result => result.rows)
          .catch(error => error.detail);
      }
    }
  })
});

const StudentType = new GraphQLObjectType({
  name: 'Student',
  fields: () => ({
    id: { type: GraphQLInt },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    github: { type: GraphQLString },
    status: { type: GraphQLString },
    cohort: {
      type: CohortType,
      resolve(parent) {
        return query(`SELECT * FROM cohorts WHERE id=${parent.cohort_id}`)
          .then(result => result.rows[0])
          .catch(err => err.detail);
      }
    },
    teams: {
      type: new GraphQLList(TeamType),
      resolve(parent) {
        return query(`
          SELECT teams.id, teams.teamName, teams.github, teams.cohortId FROM teams
          JOIN team_student ON(teams.id=team_student.team_id)
          JOIN students ON(students.id=team_student.student_id)
          WHERE student_id=${parent.id}
          ORDER BY id ASC
        `)
          .then(result => result.rows)
          .catch(error => error.detail);
      }
    }
  })
});

const TeamType = new GraphQLObjectType({
  name: 'Team',
  fields: () => ({
    id: { type: GraphQLInt },
    teamName: { type: GraphQLString },
    github: { type: GraphQLString },
    cohort: {
      type: CohortType,
      resolve(parent) {
        return query(`SELECT * FROM cohorts WHERE id=${parent.cohort_id}`)
          .then(result => result.rows[0])
          .catch(error => error.detail);
      }
    },
    teamType: { type: GraphQLString },
    students: {
      type: new GraphQLList(StudentType),
      resolve(parent) {
        return query(`
          SELECT
            students.id, students.first_name, students.last_name, students.github, students.cohort_id
          FROM students
          JOIN team_student ON(students.id=team_student.student_id)
          JOIN teams ON(teams.id=team_student.team_id)
          WHERE team_id=${parent.id}
          ORDER BY first_name ASC`)
          .then(res => res.rows)
          .catch(err => console.log(err.details));
      }
    }
  })
});

const SprintType = new GraphQLObjectType({
  name: 'Sprint',
  fields: () => ({
    id: { type: GraphQLInt },
    sprintName: { type: GraphQLString },
    messages: {
      type: new GraphQLList(CommitMessageType),
      resolve(parent) {
        return query(`
          SELECT * from messages WHERE sprint_id=${parent.id}
          ORDER BY id ASC
        `)
          .then(result => result.rows)
          .catch(error => error.detail || error);
      }
    }
  })
});

const CommitMessageType = new GraphQLObjectType({
  name: 'CommitMessage',
  fields: () => ({
    id: { type: GraphQLInt },
    messageText: { type: GraphQLString },
    sprint: {
      type: SprintType,
      resolve(parent) {
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

const ReleasedToyProblemType = new GraphQLObjectType({
  name: 'ReleasedToyProblem',
  fields: () => ({
    name: { type: GraphQLString },
    date: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    cohort: {
      type: CohortType,
      args: { id: { type: GraphQLInt } },
      resolve(args) {
        return query(`SELECT * FROM cohorts WHERE id=${args.id}`)
          .then(result => result.rows[0])
          .catch(error => error.detail);
      }
    },
    student: {
      type: StudentType,
      args: { id: { type: GraphQLInt } },
      resolve(args) {
        return query(`SELECT * FROM students WHERE id=${args.id}`)
          .then(result => result.rows[0])
          .catch(error => error.detail);
      }
    },
    team: {
      type: TeamType,
      args: { id: { type: GraphQLInt } },
      resolve(args) {
        return query(`SELECT * FROM teams WHERE id=${args.id}`)
          .then(result => result.rows[0])
          .catch(error => error.detail);
      }
    },
    sprint: {
      type: SprintType,
      args: { id: { type: GraphQLInt } },
      resolve(args) {
        return query(`SELECT * FROM sprints WHERE id=${args.id}`)
          .then(result => result.rows[0])
          .catch(error => error.detail || error);
      }
    },
    cohorts: {
      type: new GraphQLList(CohortType),
      resolve() {
        return cohorts
          .getAllCohorts()
          .then(result => result)
          .catch(error => error.detail || error);
      }
    },
    students: {
      type: new GraphQLList(StudentType),
      resolve() {
        return query('SELECT * FROM students ORDER BY first_name ASC')
          .then(result => result.rows)
          .catch(error => error.detail);
      }
    },
    teams: {
      type: new GraphQLList(TeamType),
      resolve() {
        return query('SELECT * FROM teams ORDER BY id ASC')
          .then(result => result.rows)
          .catch(error => error.detail);
      }
    },
    sprints: {
      type: new GraphQLList(SprintType),
      resolve() {
        return query('SELECT * FROM sprints ORDER BY id ASC')
          .then(result => result.rows)
          .catch(error => error.detail || error);
      }
    },
    releasedToyProblems: {
      type: new GraphQLList(ReleasedToyProblemType),
      args: { cohort: { type: GraphQLString } },
      resolve(parent, args) {
        const { cohort } = args;
        return toyProblems
          .getReleasedToyProblems(cohort)
          .then(result => result)
          .catch(error => error.detail || error);
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createCohort: {
      type: CohortType,
      args: {
        cohortName: { type: GraphQLString },
        phase: { type: GraphQLString }
      },
      resolve(parent, args) {
        let { cohortName, phase } = args;
        cohortName = cohortName.toLowerCase();
        return cohorts
          .addCohort({ cohortName, phase })
          .then(result => result)
          .catch(error => error.detail || error);
      }
    },
    createStudent: {
      type: StudentType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        github: { type: new GraphQLNonNull(GraphQLString) },
        cohortId: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        const { firstName, lastName, github, cohortId } = args;
        return students
          .addStudent({ firstName, lastName, github, cohortId })
          .then(result => result)
          .catch(error => error.detail || error);
      }
    },
    createSprint: {
      type: SprintType,
      args: {
        sprintName: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        const { sprintName } = args;
        return sprints
          .addSprint(sprintName)
          .then(result => result)
          .catch(error => error.detail || error);
      }
    },
    createTeam: {
      type: TeamType,
      args: {
        teamName: { type: new GraphQLNonNull(GraphQLString) },
        teamType: { type: new GraphQLNonNull(GraphQLString) },
        github: { type: new GraphQLNonNull(GraphQLString) },
        cohortId: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        const { teamName, teamType, github, cohortId } = args;
        return teams
          .addTeam({ teamName, teamType, github, cohortId })
          .then(result => result)
          .catch(error => error.detail || error);
      }
    },
    createCommitMessage: {
      type: CommitMessageType,
      args: {
        sprintId: { type: new GraphQLNonNull(GraphQLInt) },
        messageText: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        const { messageText, sprintId } = args;
        return sprints
          .addMessage(messageText, sprintId)
          .then(result => result)
          .catch(error => error.detail || error);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
