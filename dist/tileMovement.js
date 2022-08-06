// number tile movements (one tile, two tile, etc.)
export const numTileMovement = (i, j, num, boardDimension, strikeCounter) => {
  let activeTileCount = 0;
  let newTileStatus = Array(boardDimension).fill(null).map(() => Array(boardDimension).fill(false));

  if (j - num >= 0) {
    // left tile
    if (strikeCounter[i][j - num] < 3) activeTileCount++;
    newTileStatus[i][j - num] = true;
  }

  if (j + num < boardDimension) {
    // right tile
    if (strikeCounter[i][j + num] < 3) activeTileCount++;
    newTileStatus[i][j + num] = true;
  }

  if (i - num >= 0) {
    // upper row
    if (strikeCounter[i - num][j] < 3) activeTileCount++;
    newTileStatus[i - num][j] = true;

    if (j - num >= 0) {
      if (strikeCounter[i - num][j - num] < 3) activeTileCount++;
      newTileStatus[i - num][j - num] = true;
    }

    if (j + num < boardDimension) {
      if (strikeCounter[i - num][j + num] < 3) activeTileCount++;
      newTileStatus[i - num][j + num] = true;
    }
  }

  if (i + num < boardDimension) {
    // lower row
    if (strikeCounter[i + num][j] < 3) activeTileCount++;
    newTileStatus[i + num][j] = true;

    if (j - num >= 0) {
      if (strikeCounter[i + num][j - num] < 3) activeTileCount++;
      newTileStatus[i + num][j - num] = true;
    }

    if (j + num < boardDimension) {
      if (strikeCounter[i + num][j + num] < 3) activeTileCount++;
      newTileStatus[i + num][j + num] = true;
    }
  }

  return {
    newTileStatus,
    activeTileCount
  };
};