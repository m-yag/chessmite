import React, {useState} from 'react'

// styles & react components
import './main.css'
import Tile from './Tile'

// javascript modules
import {getTileCategory} from './tileProbability'
import {numTileMovement} from './tileMovement'

const Chessmith = () => {
  // Square dimension of the board
  const boardDimension = 6
  // Tile probablity categories/weights
  const tileCategories = [2, 1]
  const tileWeights = [4, 6]

  // States
  /*********************************************/
  const [layerOne] = useState( () => {
    let array = []
    for(let i = 0; i < boardDimension; i++) {
      array[i] = []
      for(let j = 0; j < boardDimension; j++) {
        let tile = getTileCategory(tileCategories, tileWeights)
        array[i][j] = tile
      }
    }
    return array
  })

  const [activeTiles, setActiveTiles] = useState( () => {
    return Array(boardDimension).fill(null).map(() => Array(boardDimension).fill(true))
  })
  const [strikeCounter, setStrikeCounter] = useState( () => {
    return Array(boardDimension).fill(null).map(() => Array(boardDimension).fill(0))
  })
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
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
    const newStrikeCounter = [...strikeCounter]
    newStrikeCounter[i][j]++
    setStrikeCounter(newStrikeCounter)
  }

  const tileClick = (type, i, j) => {
    incrementStrike(i, j)
    setScore(score + 1)
    if(type === 1) {
      let {newTileStatus, activeTileCount} = numTileMovement(i, j, 1, boardDimension, strikeCounter)
      if(activeTileCount === 0) setGameOver(true)
      setActiveTiles(newTileStatus)
    } else {
      let {newTileStatus, activeTileCount} = numTileMovement(i, j, 2, boardDimension, strikeCounter)
      if(activeTileCount === 0) setGameOver(true)
      setActiveTiles(newTileStatus)
    }
  }

  const tileList = Array(boardDimension).fill(null).map(() => Array(boardDimension).fill(null))
  for(let i = 0, k = 0; i < boardDimension; i++) {
    for(let j = 0; j < boardDimension; j++, k++) {
      tileList[i][j] = <Tile
        key={k}
        type={layerOne[i][j]}
        active={activeTiles[i][j]}
        strikes={strikeCounter[i][j]}
        onClick={() => tileClick(layerOne[i][j], i, j)}
      />
    }
  }

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${boardDimension}, 15vmin)`,
    gridTemplateRows: `repeat(${boardDimension}, 15vmin)`,
  }

  return (
    <div>

      <div className="center">
        <div className="grid" style={gridStyle}>
          {tileList}
        </div>
      </div>

      <br/>

      <div className="center">
          <p className="center">
          {gameOver ? `Game Over! Score: ${score}` : `Score: ${score}`}
          </p>
      </div>

    </div>
  )
}

export default Chessmith
