import React, {useState} from 'react'

// styles & react components
import './main.css'
import Tile from './Tile'

// javascript modules
import {randPopulateLayer} from './tileProbability'
import {numTileMovement, knightTileMovement} from './tileMovement'

const Chessmith = () => {
  // Square dimension of the board
  const boardDimension = 6

  // States
  /*********************************************/
  const [layerOne] = useState(randPopulateLayer(boardDimension))
  const [layerTwo] = useState(randPopulateLayer(boardDimension))
  const [layerThree] = useState(randPopulateLayer(boardDimension))

  const [curLayer, setCurLayer] = useState(layerOne)

  const [activeTiles, setActiveTiles] = useState( () => {
    return Array(boardDimension).fill(null).map(() => Array(boardDimension).fill(true))
  })
  const [strikeCounter, setStrikeCounter] = useState( () => {
    return Array(boardDimension).fill(null).map(() => Array(boardDimension).fill(0))
  })
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  /*********************************************/

//  Debug

//  console.log(layerOne)
//  console.log(layerTwo)
//  console.log(layerThree)
  /*****************
  const layerOne = [
    [1, 2, 1, 1, 2, 1],
    [1, 1, 1, 2, 1, 1],
    [2, 1, 2, 1, 2, 2],
    [2, 2, 1, 2, 1, 1],
    [2, 1, 1, 1, 1, 2],
    [1, 1, 2, 1, 2, 1]
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

    setCurLayer(() => {
      let newLayer = []
      for(let r = 0; r < boardDimension; r++) {
        newLayer[r] = []
        for(let c = 0; c < boardDimension; c++) {
          if(r === i && c === j) {
            newLayer[r][c] = strikeCounter[i][j] === 1 ? layerTwo[i][j] : layerThree[i][j]
          } else {
            newLayer[r][c] = curLayer[r][c]
          }
        }
      }
      return newLayer
    })

    if(type === 1) {
      let {newTileStatus, activeTileCount} = numTileMovement(i, j, 1, boardDimension, strikeCounter)
      if(activeTileCount === 0) setGameOver(true)
      setActiveTiles(newTileStatus)
    } else if(type === 2) {
      let {newTileStatus, activeTileCount} = numTileMovement(i, j, 2, boardDimension, strikeCounter)
      if(activeTileCount === 0) setGameOver(true)
      setActiveTiles(newTileStatus)
    } else if(type === 3) {
      let {newTileStatus, activeTileCount} = numTileMovement(i, j, 3, boardDimension, strikeCounter)
      if(activeTileCount === 0) setGameOver(true)
      setActiveTiles(newTileStatus)
    } else if(type === 4) {
      let {newTileStatus, activeTileCount} = numTileMovement(i, j, 4, boardDimension, strikeCounter)
      if(activeTileCount === 0) setGameOver(true)
      setActiveTiles(newTileStatus)
    } else {
      let {newTileStatus, activeTileCount} = knightTileMovement(i, j, boardDimension, strikeCounter)
      if(activeTileCount === 0) setGameOver(true)
      setActiveTiles(newTileStatus)
    }
  }

  const tileList = Array(boardDimension).fill(null).map(() => Array(boardDimension).fill(null))
  for(let i = 0, k = 0; i < boardDimension; i++) {
    for(let j = 0; j < boardDimension; j++, k++) {
      tileList[i][j] = <Tile
        key={k}
        type={curLayer[i][j]}
        active={activeTiles[i][j]}
        strikes={strikeCounter[i][j]}
        onClick={() => tileClick(curLayer[i][j], i, j)}
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
