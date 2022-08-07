// Courtesy of James Xu. Thanks for the idea.
// Check him out at https://wintermutedigital.com/
export const getTileCategory = (categories, weights) => {
  let totalWeight = 0;
  weights.forEach(weight => totalWeight += weight);
  let randomValue = Math.floor(Math.random() * totalWeight);
  let runningTotal = 0;

  for (let i = 0; i < weights.length; i++) {
    runningTotal += weights[i];
    if (randomValue < runningTotal) return categories[i];
  }
};