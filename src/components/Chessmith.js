import React, {useState} from 'react'

// styles & react components
import './main.css'
import Tile from './Tile'

// javascript modules
import {randPopulateLayer} from './tileProbability'
import {
  numTileMovement,
  knightTileMovement,
  bishopTileMovement,
  rookTileMovement,
  queenTileMovement,
  wcTileMovement
} from './tileMovement'

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

  const [wildCard, setWildCard] = useState([false, false])

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
  console.log(strikeCounter)

  const incrementStrike = (i, j) => {
    const newStrikeCounter = [...strikeCounter]
    newStrikeCounter[i][j]++
    setStrikeCounter(newStrikeCounter)
  }

  const isAllStriked = n => {
    let tally = 0
    let max = boardDimension * boardDimension
    strikeCounter.forEach(row => {
      row.forEach(counter => {
        if(counter >= n) tally++
      })
    })
    if(tally === max) return true
    return false
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
            // tile progresses to next layer
            newLayer[r][c] = strikeCounter[i][j] === 1 ? layerTwo[i][j] : layerThree[i][j]
            // if all tiles struck, activate wild card tile
            if(isAllStriked(1) && wildCard[0] === false) {
              setWildCard([true, false])
              newLayer[r][c] = '⚜'
            }
            if(isAllStriked(2) && wildCard[1] === false) {
              setWildCard([true, true])
              newLayer[r][c] = '⚜'
            }
          } else {
            newLayer[r][c] = curLayer[r][c]
          }
        }
      }
      return newLayer
    })

    switch(type) {
      case 1:         // numeric
      case 2:
      case 3:
      case 4: {
        let {newTileStatus, activeTileCount} = numTileMovement(i, j, type, boardDimension, strikeCounter)
        if(activeTileCount === 0) setGameOver(true)
        setActiveTiles(newTileStatus)
      } break

      case '♘': {     // knight
        let {newTileStatus, activeTileCount} = knightTileMovement(i, j, boardDimension, strikeCounter)
        if(activeTileCount === 0) setGameOver(true)
        setActiveTiles(newTileStatus)
       } break

      case '♗': {     // bishop
        let {newTileStatus, activeTileCount} = bishopTileMovement(i, j, boardDimension, strikeCounter)
        if(activeTileCount === 0) setGameOver(true)
        setActiveTiles(newTileStatus)
      } break

      case '♖': {     // rook
        let {newTileStatus, activeTileCount} = rookTileMovement(i, j, boardDimension, strikeCounter)
        if(activeTileCount === 0) setGameOver(true)
        setActiveTiles(newTileStatus)
      } break

      case '♕': {     // queen
        let {newTileStatus, activeTileCount} = queenTileMovement(i, j, boardDimension, strikeCounter)
        if(activeTileCount === 0) setGameOver(true)
        setActiveTiles(newTileStatus)
      } break

      case '⚜': {     // wildcard
        let {newTileStatus, activeTileCount} = wcTileMovement(i, j, boardDimension, strikeCounter)
        if(activeTileCount === 0) setGameOver(true)
        setActiveTiles(newTileStatus)
      } break

      default:
        console.log("Error: no matching tile found!")
    }
  }

  // render all tiles
  const tileList = Array(boardDimension).fill(null).map(() => Array(boardDimension).fill(null))
  for(let i = 0, k = 0; i < boardDimension; i++) {
    for(let j = 0; j < boardDimension; j++, k++) {
      tileList[i][j] = <Tile
        key={k}  // Date.now() ensures unique key number each time to force rerender Tile CSS.
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
