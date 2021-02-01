import utils from './utils';

describe('editDistance()', () => {
  it('should return 0 when input strings are identical', () => {
    const str = 'abc';
    expect(utils.editDistance(str, str)).toEqual(0);
  });

  it('should return 1 when input strings have one different character', () => {
    const str1 = 'abc';
    const str2 = 'abx';
    expect(utils.editDistance(str1, str2)).toEqual(1);
  });

  it('should return 1 when one input string has an additional space', () => {
    const str1 = 'abc';
    const str2 = 'ab c';
    expect(utils.editDistance(str1, str2)).toEqual(1);
  });

  it('should return 2 when input strings have two different characters', () => {
    const str1 = 'abc';
    const str2 = 'ade';
    expect(utils.editDistance(str1, str2)).toEqual(2);
  });
});

describe('getSimilarityPercentage()', () => {
  it('should return 1 when input strings are identical', () => {
    const str = 'abc';
    expect(utils.getSimilarityPercentage(str, str)).toEqual(1);
  });

  it('should return 1 when input strings does not have any matching character', () => {
    const str1 = 'abc';
    const str2 = 'xyz';
    expect(utils.getSimilarityPercentage(str1, str2)).toEqual(0);
  });

  it('should return 0.75 when input strings have 4 characters and 1 character is different', () => {
    const str1 = 'abcd';
    const str2 = 'abxd';
    expect(utils.getSimilarityPercentage(str1, str2)).toEqual(0.75);
  });
});
