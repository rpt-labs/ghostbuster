const editDistance = (string1, string2) => {
  const s1 = string1.toLowerCase();
  const s2 = string2.toLowerCase();

  const distance = [];
  for (let i = 0; i <= s1.length; i += 1) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j += 1) {
      if (i === 0) distance[j] = j;
      else if (j > 0) {
        let newValue = distance[j - 1];
        if (s1.charAt(i - 1) !== s2.charAt(j - 1))
          newValue = Math.min(Math.min(newValue, lastValue), distance[j]) + 1;
        distance[j - 1] = lastValue;
        lastValue = newValue;
      }
    }
    if (i > 0) distance[s2.length] = lastValue;
  }
  return distance[s2.length];
};

const getSimilarityPercentage = (str1, str2) => {
  let longer = str1;
  let shorter = str2;
  if (str1.length < str2.length) {
    longer = str2;
    shorter = str1;
  }
  const longerLength = longer.length;
  if (longerLength === 0) {
    return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
};

module.exports = {
  getSimilarityPercentage
};
