import React, {useState} from 'react'
import './main.css'
import Tile from './Tile'

const Chessmith = () => {
  // Square dimension of the board
  const boardDimension = 5

  // States
  /*********************************************/
  const [activeTiles, setActiveTiles] = useState( () => {
    return Array(boardDimension).fill(null).map(() => Array(boardDimension).fill(true))
  })
  const [strikeCounter, setStrikeCounter] = useState( () => {
    return Array(boardDimension).fill(null).map(() => Array(boardDimension).fill(0))
  })
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  /*********************************************/


  // Testing board
  const layerOne = Array(boardDimension).fill(null).map(() => Array(boardDimension).fill(1))

  // Tile Movement Functions
  /*********************************************/
  const oneTileMovement = (i, j) => {
    var activeTileCount = 0

    var newTileStatus = Array(boardDimension).fill(null).map(() => Array(boardDimension).fill(false))
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

    if(activeTileCount === 0) setGameOver(true)

    setActiveTiles(newTileStatus)
  }

  /*********************************************/

  const incrementStrike = (i, j) => {
    const newStrikeCounter = [...strikeCounter]
    newStrikeCounter[i][j]++
    setStrikeCounter(newStrikeCounter)
}

  const tileClick = (type, i, j) => {
    incrementStrike(i, j)
    setScore(score + 1)
    if(type === 1) {
      oneTileMovement(i, j)
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
    gridTemplateColumns: `repeat(${boardDimension}, 5rem)`,
    gridTemplateRows: `repeat(${boardDimension}, 5rem)`,
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
