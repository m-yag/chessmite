// number tile movements (one tile, two tile, etc.)
export const numTileMovement = (i, j, num, boardDimension, strikeCounter) => {
  let activeTileCount = 0

  let newTileStatus = Array(boardDimension).fill(null).map(() => Array(boardDimension).fill(false))
  if(j - num >= 0) {  // left tile
    if(strikeCounter[i][j-num] < 3) activeTileCount++
    newTileStatus[i][j-num] = true
  }
  if(j + num < boardDimension) {  // right tile
    if(strikeCounter[i][j+num] < 3) activeTileCount++
    newTileStatus[i][j+num] = true
  }
  if(i - num >= 0) {  // upper row
    if(strikeCounter[i-num][j] < 3) activeTileCount++
    newTileStatus[i-num][j] = true
    if(j - num >= 0) {
      if(strikeCounter[i-num][j-num] < 3) activeTileCount++
      newTileStatus[i-num][j-num] = true
    }
    if(j + num < boardDimension) {
      if(strikeCounter[i-num][j+num] < 3) activeTileCount++
      newTileStatus[i-num][j+num] = true
    }
  }
  if(i + num < boardDimension) {  // lower row
    if(strikeCounter[i+num][j] < 3) activeTileCount++
    newTileStatus[i+num][j] = true
    if(j - num >= 0) {
      if(strikeCounter[i+num][j-num] < 3) activeTileCount++
      newTileStatus[i+num][j-num] = true
    }
    if(j + num < boardDimension) {
      if(strikeCounter[i+num][j+num] < 3) activeTileCount++
      newTileStatus[i+num][j+num] = true
    }
  }

  return {newTileStatus, activeTileCount}
}

// knight tile movement
export const knightTileMovement = (i, j, boardDimension, strikeCounter) => {
  let activeTileCount = 0

  let newTileStatus = Array(boardDimension).fill(null).map(() => Array(boardDimension).fill(false))
  if(j - 2 >= 0) {
    if(i + 1 < boardDimension) {  // left-down
      if(strikeCounter[i+1][j-2] < 3) activeTileCount++
      newTileStatus[i+1][j-2] = true
    }
    if(i - 1 >= 0) {              // left-up
      if(strikeCounter[i-1][j-2] < 3) activeTileCount++
      newTileStatus[i-1][j-2] = true
    }
  }
  if(i - 2 >= 0) {
    if(j - 1 >= 0) {              // up-left
      if(strikeCounter[i-2][j-1] < 3) activeTileCount++
      newTileStatus[i-2][j-1] = true
    }
    if(j + 1 < boardDimension) {  // up-right
      if(strikeCounter[i-2][j+1] < 3) activeTileCount++
      newTileStatus[i-2][j+1] = true
    }
  }
  if(j + 2 < boardDimension) {
    if(i - 1 >= 0) {              // right-up
      if(strikeCounter[i-1][j+2] < 3) activeTileCount++
      newTileStatus[i-1][j+2] = true
    }
    if(i + 1 < boardDimension) {  // right-down
      if(strikeCounter[i+1][j+2] < 3) activeTileCount++
      newTileStatus[i+1][j+2] = true
    }
  }
  if(i + 2 < boardDimension) {
    if(j + 1 < boardDimension) {  // down-right
      if(strikeCounter[i+2][j+1] < 3) activeTileCount++
      newTileStatus[i+2][j+1] = true
    }
    if(j - 1 >= 0) {              // down-left
      if(strikeCounter[i+2][j-1] < 3) activeTileCount++
      newTileStatus[i+2][j-1] = true
    }
  }

  return {newTileStatus, activeTileCount}
}
