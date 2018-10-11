/*
add any cohort info for students currently in the pairing part of the program
the upper case constant name reflects how the attendance tool has been written
however for matching github repos, the name property must be lower case
*/

const COHORT_NAME_ALL_CAPS = {
  name: 'cohortnamelowercase',
  students: [
    {
      firstName: 'Mickey',
      lastName: 'Mouse',
      github: 'm-o-u-s-e'
    },
    {
      firstName: 'Cheese',
      lastName: 'Tart',
      github: 'gotUHooked'
    }
  ]
}

const ANOTHER_COHORT = {
  name: 'anothercohortnamelowercase',
  students: [
    {
      firstName: 'Great',
      lastName: 'Like',
      github: 'chicken'
    },
    {
      firstName: 'Chris',
      lastName: 'P',
      github: 'bacon'
    }
  ]
}


module.exports = { COHORT_NAME_ALL_CAPS, ANOTHER_COHORT }
