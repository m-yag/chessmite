// Tile probability categories/weights
const tileCategories = [4, '♗', '♘', 3, 2, 1]
const tileWeights = [2, 3, 3, 3, 4, 5]

// Randomly determined tile based on weighted chance.
const getTileCategory = (categories, weights) => {
  let totalWeight = 0
  weights.forEach(weight => totalWeight += weight)

  let randomValue = Math.floor(Math.random() * totalWeight)

  let runningTotal = 0
  for(let i = 0; i < weights.length; i++) {
    runningTotal += weights[i]
    if(randomValue < runningTotal) return categories[i]
  }
}
// Courtesy of James Xu. Thanks for the idea.
// Check him out at https://wintermutedigital.com/

// Randomly populate board layer
export const randPopulateLayer = (boardDimension) => {
  let array = []
  for(let i = 0; i < boardDimension; i++) {
    array[i] = []
    for(let j = 0; j < boardDimension; j++) {
      let tile = getTileCategory(tileCategories, tileWeights)

      // if tile category = 4 && middle tile, get a different category
      while( (tile === 4) && ((i === 2 || i === 3) && (j === 2 || j === 3)) ) {
        tile = getTileCategory(tileCategories, tileWeights)
      }

      array[i][j] = tile
    }
  }
  return array
}
