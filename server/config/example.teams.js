/*
  thesisTeams, legacyTeams, and greenfieldTeams all follow the same format.  If there are no teams, just set it to an empty object.
*/

const thesisTeams = {
  teamName: {
    github: 'github-org-name',
    students: [
      {
        firstName: 'Person1',
        github: 'person1GithubHandle'
      },
      {
        firstName: 'Person2',
        github: 'person2GithubHandle'
      }
    ]
  },
  anotherTeamName: {
    github: 'github-org-name',
    students: [
      {
        firstName: 'Person3',
        github: 'person3GithubHandle'
      },
      {
        firstName: 'Person4',
        github: 'person4GithubHandle'
      }
    ]
  }
};

// module.exports = { thesisTeams, greenfieldTeams, legacyTeams };
module.exports = { thesisTeams };
