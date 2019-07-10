/*
add any cohort info for students currently in the pairing part of the program
the upper case constant name reflects how the attendance tool has been written
however for matching github repos, the name property must be lower case
*/

const COHORT_NAME_ALL_CAPS = {
  name: 'cohortnamelowercase',
  status: 'current', // precourse, current, outcomes, closed
  students: [
    {
      firstName: 'Mickey',
      lastName: 'Mouse',
      github: 'm-o-u-s-e',
      status: 'enrolled',  // precourse, enrolled, withdrew, separated, mulligan, alum
      cohortId: 16
    },
    {
      firstName: 'Cheese',
      lastName: 'Tart',
      github: 'gotUHooked'
      status: 'enrolled',
      cohortId: 16
    }
  ]
};

const ANOTHER_COHORT = {
  name: 'anothercohortnamelowercase',
  status: 'current',
  students: [
    {
      firstName: 'Great',
      lastName: 'Like',
      github: 'chicken',
      status: 'enrolled',
      cohortId: 16
   },
    {
      firstName: 'Chris',
      lastName: 'P',
      github: 'bacon',
      status: 'enrolled',
      cohortId: 16
    }
  ]
};

module.exports = { COHORT_NAME_ALL_CAPS, ANOTHER_COHORT };
