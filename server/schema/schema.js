const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
} = require('graphql');
const _ = require('lodash');
const { allCohorts, students } = require('../config/cohorts');
const { allTeams, teamStudents } = require('../config/teams');

const CohortType = new GraphQLObjectType({
  name: 'Cohort',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    phase: { type: GraphQLString },
    students: {
      type: new GraphQLList(StudentType),
      resolve(parent, args) {
        return _.filter(students, { cohortId: parent.id });
      }
    }
  }),
});

const StudentType = new GraphQLObjectType({
  name: 'Student',
  fields: () => ({
    id: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    github: { type: GraphQLString },
    cohort: {
      type: CohortType,
      resolve(parent, args) {
        return _.find(allCohorts, { id: parent.cohortId });
      }
    },
    teams: {
      type: new GraphQLList(TeamType),
      resolve(parent, args) {
        // deal with associative table
        const matchingRecords = teamStudents.filter(record => record.studentId === parent.id);
        const matchingTeams = matchingRecords.map((record) => {
          return allTeams.filter(team => team.id === record.teamId)[0];
        });
        return matchingTeams;
      }
    }
  }),
});

const TeamType = new GraphQLObjectType({
  name: 'Team',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    github: { type: GraphQLString },
    cohort: {
      type: CohortType,
      resolve(parent, args) {
        return _.find(allCohorts, { id: parent.cohortId});
      }
    },
    teamType: { type: GraphQLString },
    students: {
      type: new GraphQLList(StudentType),
      resolve(parent, args) {
        let matchingRecords = _.filter(teamStudents, { teamId: parent.id });
        return matchingRecords.map((record) => {
          return students.filter(student => student.id === record.studentId)[0];
        });
      }
    }
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    cohort: {
      type: CohortType,
      args: {id: { type: GraphQLInt }},
      resolve(parent, args) {
        //later get stuff from DB here
        return _.find(allCohorts, { id: args.id });
      }
    },
    student: {
      type: StudentType,
      args: {id: { type: GraphQLInt }},
      resolve(parent, args) {
        return _.find(students, { id: args.id });
      }
    },
    cohorts: {
      type: new GraphQLList(CohortType),
      resolve(parent, args) {
        return allCohorts;
      }
    },
    students: {
      type: new GraphQLList(StudentType),
      resolve(parent, args) {
        return students;
      }
    },
    teams: {
      type: new GraphQLList(TeamType),
      resolve(parent, args) {
        return allTeams;
      }
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
