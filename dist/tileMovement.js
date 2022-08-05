export const oneTileMovement = (i, j, boardDimension, strikeCounter) => {
  var activeTileCount = 0;
  var newTileStatus = Array(boardDimension).fill(null).map(() => Array(boardDimension).fill(false));

  if (j - 1 >= 0) {
    // left tile
    if (strikeCounter[i][j - 1] < 3) activeTileCount++;
    newTileStatus[i][j - 1] = true;
  }

  if (j + 1 < boardDimension) {
    // right tile
    if (strikeCounter[i][j + 1] < 3) activeTileCount++;
    newTileStatus[i][j + 1] = true;
  }

  if (i - 1 >= 0) {
    // upper row
    if (strikeCounter[i - 1][j] < 3) activeTileCount++;
    newTileStatus[i - 1][j] = true;

    if (j - 1 >= 0) {
      if (strikeCounter[i - 1][j - 1] < 3) activeTileCount++;
      newTileStatus[i - 1][j - 1] = true;
    }

    if (j + 1 < boardDimension) {
      if (strikeCounter[i - 1][j + 1] < 3) activeTileCount++;
      newTileStatus[i - 1][j + 1] = true;
    }
  }

  if (i + 1 < boardDimension) {
    // lower row
    if (strikeCounter[i + 1][j] < 3) activeTileCount++;
    newTileStatus[i + 1][j] = true;

    if (j - 1 >= 0) {
      if (strikeCounter[i + 1][j - 1] < 3) activeTileCount++;
      newTileStatus[i + 1][j - 1] = true;
    }

    if (j + 1 < boardDimension) {
      if (strikeCounter[i + 1][j + 1] < 3) activeTileCount++;
      newTileStatus[i + 1][j + 1] = true;
    }
  }

  return {
    newTileStatus,
    activeTileCount
  };
};