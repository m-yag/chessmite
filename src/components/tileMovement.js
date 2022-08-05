export const oneTileMovement = (i, j, boardDimension, strikeCounter) => {
  let activeTileCount = 0

  let newTileStatus = Array(boardDimension).fill(null).map(() => Array(boardDimension).fill(false))
  if(j - 1 >= 0) {  // left tile
    if(strikeCounter[i][j-1] < 3) activeTileCount++
    newTileStatus[i][j-1] = true
  }
  if(j + 1 < boardDimension) {  // right tile
    if(strikeCounter[i][j+1] < 3) activeTileCount++
    newTileStatus[i][j+1] = true
  }
  if(i - 1 >= 0) {  // upper row
    if(strikeCounter[i-1][j] < 3) activeTileCount++
    newTileStatus[i-1][j] = true
    if(j - 1 >= 0) {
      if(strikeCounter[i-1][j-1] < 3) activeTileCount++
      newTileStatus[i-1][j-1] = true
    }
    if(j + 1 < boardDimension) {
      if(strikeCounter[i-1][j+1] < 3) activeTileCount++
      newTileStatus[i-1][j+1] = true
    }
  }
  if(i + 1 < boardDimension) {  // lower row
    if(strikeCounter[i+1][j] < 3) activeTileCount++
    newTileStatus[i+1][j] = true
    if(j - 1 >= 0) {
      if(strikeCounter[i+1][j-1] < 3) activeTileCount++
      newTileStatus[i+1][j-1] = true
    }
    if(j + 1 < boardDimension) {
      if(strikeCounter[i+1][j+1] < 3) activeTileCount++
      newTileStatus[i+1][j+1] = true
    }
  }

  return {newTileStatus, activeTileCount}
}

export const twoTileMovement = (i, j, boardDimension, strikeCounter) => {
  let activeTileCount = 0

  let newTileStatus = Array(boardDimension).fill(null).map(()=>Array(boardDimension).fill(false))
  if(j - 2 >= 0) {  // left tile
    if(strikeCounter[i][j-2] < 3) activeTileCount++
    newTileStatus[i][j-2] = true
  }
  if(j + 2 < boardDimension) {  // right tile
    if(strikeCounter[i][j+2] < 3) activeTileCount++
    newTileStatus[i][j+2] = true
  }
  if(i - 2 >= 0) {  // upper row
    if(strikeCounter[i-2][j] < 3) activeTileCount++
    newTileStatus[i-2][j] = true
    if(j - 2 >= 0) {
      if(strikeCounter[i-2][j-2] < 3) activeTileCount++
      newTileStatus[i-2][j-2] = true
    }
    if(j + 2 < boardDimension) {
      if(strikeCounter[i-2][j+2] < 3) activeTileCount++
      newTileStatus[i-2][j+2] = true
    }
  }
  if(i + 2 < boardDimension) {  // lower row
    if(strikeCounter[i+2][j] < 3) activeTileCount++
    newTileStatus[i+2][j] = true
    if(j - 2 >= 0) {
      if(strikeCounter[i+2][j-2] < 3) activeTileCount++
      newTileStatus[i+2][j-2] = true
    }
    if(j + 2 < boardDimension) {
      if(strikeCounter[i+2][j+2] < 3) activeTileCount++
      newTileStatus[i+2][j+2] = true
    }
  }

  return {newTileStatus, activeTileCount}
}
