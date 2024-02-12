import React, {useState} from 'react'

// styles & react components
import './main.css'
import styles from './chessmite.module.css'
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

const Chessmite = ({
    displayScore = false,
    tileOne = '', tileTwo = '', tileThree = '',
    customLayer1, customLayer2, customLayer3
    }) => {

  // custom layer verification
  const isValidLayer = (layer) => {
    if(!layer) return false
    if(layer.length !== 6) return false
    layer.forEach((row) => {if(row.length !== 6) return false})
    return true
  }

  // synchronize all pulse animation
  document.getAnimations().forEach((animation) => {
    let name = animation.animationName
    if(name === 'pulse1' || name === 'pulse2' || name === 'pulse3') animation.startTime = 0
  })

  // square dimension of the board
  const boardDimension = 6

  // States
  /*********************************************/
  const [layerOne] = useState(isValidLayer(customLayer1) ? customLayer1 : randPopulateLayer(boardDimension))
  const [layerTwo] = useState(isValidLayer(customLayer2) ? customLayer2 : randPopulateLayer(boardDimension))
  const [layerThree] = useState(isValidLayer(customLayer3) ? customLayer3 : randPopulateLayer(boardDimension))

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

    setTimeout( () => {   // 250ms delay to permit flip-animation to reach midpoint before state change.

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
                newLayer[r][c] = 'W'
              }
              if(isAllStriked(2) && wildCard[1] === false) {
                setWildCard([true, true])
                newLayer[r][c] = 'W'
              }
            } else {
              newLayer[r][c] = curLayer[r][c]
            }
          }
        }
        return newLayer
      })

    }, 250) // end of timeout

    switch(type) {
      case 1:         // numeric
      case 2:
      case 3:
      case 4: {
        let {newTileStatus, activeTileCount} = numTileMovement(i, j, type, boardDimension, strikeCounter)
        if(activeTileCount === 0) setGameOver(true)
        setActiveTiles( Array(boardDimension).fill(null).map(() => Array(boardDimension).fill(true)))
        setActiveTiles(newTileStatus)
      } break

      case 'N': {     // knight
        let {newTileStatus, activeTileCount} = knightTileMovement(i, j, boardDimension, strikeCounter)
        if(activeTileCount === 0) setGameOver(true)
        setActiveTiles( Array(boardDimension).fill(null).map(() => Array(boardDimension).fill(true)))
        setActiveTiles(newTileStatus)
       } break

      case 'B': {     // bishop
        let {newTileStatus, activeTileCount} = bishopTileMovement(i, j, boardDimension, strikeCounter)
        if(activeTileCount === 0) setGameOver(true)
        setActiveTiles( Array(boardDimension).fill(null).map(() => Array(boardDimension).fill(true)))
        setActiveTiles(newTileStatus)
      } break

      case 'R': {     // rook
        let {newTileStatus, activeTileCount} = rookTileMovement(i, j, boardDimension, strikeCounter)
        if(activeTileCount === 0) setGameOver(true)
        setActiveTiles( Array(boardDimension).fill(null).map(() => Array(boardDimension).fill(true)))
        setActiveTiles(newTileStatus)
      } break

      case 'Q': {     // queen
        let {newTileStatus, activeTileCount} = queenTileMovement(i, j, boardDimension, strikeCounter)
        if(activeTileCount === 0) setGameOver(true)
        setActiveTiles( Array(boardDimension).fill(null).map(() => Array(boardDimension).fill(true)))
        setActiveTiles(newTileStatus)
      } break

      case 'W': {     // wildcard
        let {newTileStatus, activeTileCount} = wcTileMovement(i, j, boardDimension, strikeCounter)
        if(activeTileCount === 0) setGameOver(true)
        setActiveTiles( Array(boardDimension).fill(null).map(() => Array(boardDimension).fill(true)))
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
        key={k}
        type={curLayer[i][j]}
        active={activeTiles[i][j]}
        strikes={strikeCounter[i][j]}
        onClick={() => tileClick(curLayer[i][j], i, j)}
        score={score}

        tileOne={tileOne}
        tileTwo={tileTwo}
        tileThree={tileThree}
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

      <div className={styles.center}>
        <div className={styles.grid} style={gridStyle}>
          {tileList}
        </div>
      </div>


      {displayScore && (
        <div className={styles.center} style={{marginTop: '-0.3em', fontSize: '1.2em'}}>
            <p>
              <strong>{gameOver ? 'Game Over!' : ''}</strong>
            </p>
            <p>
              Score: {score}
            </p>
        </div>
      )}

    </div>
  )
}

export default Chessmite
