import * as toyProblemsChecker from './toyProblemsChecker';

describe('getStudentsList()', () => {
  it('should return empty array when the cohort has no students', () => {
    const cohort = 'rpt10';
    expect(toyProblemsChecker.getStudentsList(cohort)).toEqual([]);
  });
});
