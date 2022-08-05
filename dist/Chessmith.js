import React, { useState } from 'react';
import './main.css';
import Tile from './Tile';
import { oneTileMovement, twoTileMovement } from './tileMovement';

const Chessmith = () => {
  // Square dimension of the board
  const boardDimension = 5; // States

  /*********************************************/

  const [layerOne] = useState(() => {
    let array = [];

    for (let i = 0; i < boardDimension; i++) {
      array[i] = [];

      for (let j = 0; j < boardDimension; j++) {
        array[i][j] = Math.ceil(Math.random() * 2);
      }
    }

    return array;
  });
  const [activeTiles, setActiveTiles] = useState(() => {
    return Array(boardDimension).fill(null).map(() => Array(boardDimension).fill(true));
  });
  const [strikeCounter, setStrikeCounter] = useState(() => {
    return Array(boardDimension).fill(null).map(() => Array(boardDimension).fill(0));
  });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  /*********************************************/

  /* Testing board *
  const layerOne = [
    [1, 2, 1, 1, 2],
    [1, 1, 1, 2, 1],
    [2, 1, 2, 1, 2],
    [2, 2, 1, 2, 1],
    [2, 1, 1, 1, 1]
  ]
  /*****************/

  const incrementStrike = (i, j) => {
    const newStrikeCounter = [...strikeCounter];
    newStrikeCounter[i][j]++;
    setStrikeCounter(newStrikeCounter);
  };

  const tileClick = (type, i, j) => {
    incrementStrike(i, j);
    setScore(score + 1);

    if (type === 1) {
      let {
        newTileStatus,
        activeTileCount
      } = oneTileMovement(i, j, boardDimension, strikeCounter);
      if (activeTileCount === 0) setGameOver(true);
      setActiveTiles(newTileStatus);
    } else {
      let {
        newTileStatus,
        activeTileCount
      } = twoTileMovement(i, j, boardDimension, strikeCounter);
      if (activeTileCount === 0) setGameOver(true);
      setActiveTiles(newTileStatus);
    }
  };

  const tileList = Array(boardDimension).fill(null).map(() => Array(boardDimension).fill(null));

  for (let i = 0, k = 0; i < boardDimension; i++) {
    for (let j = 0; j < boardDimension; j++, k++) {
      tileList[i][j] = /*#__PURE__*/React.createElement(Tile, {
        key: k,
        type: layerOne[i][j],
        active: activeTiles[i][j],
        strikes: strikeCounter[i][j],
        onClick: () => tileClick(layerOne[i][j], i, j)
      });
    }
  }

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${boardDimension}, 5rem)`,
    gridTemplateRows: `repeat(${boardDimension}, 5rem)`
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid",
    style: gridStyle
  }, tileList)), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
    className: "center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "center"
  }, gameOver ? `Game Over! Score: ${score}` : `Score: ${score}`)));
};

export default Chessmith;