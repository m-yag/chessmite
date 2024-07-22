import React, {useState, useEffect} from 'react'

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
    displayScore = false, updateScore, updateGameOver,
    persistMode = false, resetState = false, setResetState, shuffleOnReset = false,
    tileOne = '', tileTwo = '', tileThree = '', tileComplete = '',
    customLayer1, customLayer2, customLayer3,
    }) => {

  // Helper to load or initialize state
  const loadState = (key, defaultValue) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  };

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
  const totalTiles = boardDimension * boardDimension

  // States
  /*********************************************/

  const [layerOne, setLayerOne] = useState(() => {
    if(persistMode) {
      return isValidLayer(customLayer1) ? loadState('layerOne', customLayer1) : loadState('layerOne', randPopulateLayer(boardDimension))
    } else {
      return isValidLayer(customLayer1) ? customLayer1 : randPopulateLayer(boardDimension)
    }
  })

  const [layerTwo, setLayerTwo] = useState(() => {
    if(persistMode) {
      return isValidLayer(customLayer2) ? loadState('layerTwo', customLayer2) : loadState('layerTwo', randPopulateLayer(boardDimension))
    } else {
      return isValidLayer(customLayer2) ? customLayer2 : randPopulateLayer(boardDimension)
    }
  })

  const [layerThree, setLayerThree] = useState(() => {
    if(persistMode) {
      return isValidLayer(customLayer3) ? loadState('layerThree', customLayer3) : loadState('layerThree', randPopulateLayer(boardDimension))
    } else {
      return isValidLayer(customLayer3) ? customLayer3 : randPopulateLayer(boardDimension)
    }
  })

  const [curLayer, setCurLayer] = useState(() => persistMode ? loadState('curLayer', layerOne) : layerOne)

  const [activeTiles, setActiveTiles] = useState(() => {
    if(persistMode) {
      return loadState('activeTiles', Array(boardDimension).fill().map(() => Array(boardDimension).fill(true)))
    } else {
      return Array(boardDimension).fill(null).map(() => Array(boardDimension).fill(true))
    }
  })

  const [strikeCounter, setStrikeCounter] = useState(() => {
    if(persistMode) {
      return loadState('strikeCounter', Array(boardDimension).fill().map(() => Array(boardDimension).fill(0)))
    } else {
      return Array(boardDimension).fill(null).map(() => Array(boardDimension).fill(0))
    }
  })

  const [wildCard, setWildCard] = useState(() =>
    persistMode ? loadState('wildCard', [false, false]) : [false, false]
  )

  const [gameOver, setGameOver] = useState(() =>
    persistMode ? loadState('gameOver', false) : false
  )

  const [score, setScore] = useState(() => persistMode ? loadState('score', 0) : 0)

  // Tile completion
  const [completeStates, setCompleteStates] = useState(() => {
    if(persistMode) {
      return loadState('completeStates', Array(totalTiles).fill(false))
    } else {
      return Array(totalTiles).fill(false)
    }
  })
  /*********************************************/


  // Update localStorage when states change
  useEffect(() => {
    if(persistMode && !resetState) {
      localStorage.setItem('layerOne', JSON.stringify(layerOne))
      localStorage.setItem('layerTwo', JSON.stringify(layerTwo))
      localStorage.setItem('layerThree', JSON.stringify(layerThree))
      localStorage.setItem('curLayer', JSON.stringify(curLayer))
      localStorage.setItem('strikeCounter', JSON.stringify(strikeCounter))
      localStorage.setItem('activeTiles', JSON.stringify(activeTiles))
      localStorage.setItem('wildCard', JSON.stringify(wildCard))
      localStorage.setItem('gameOver', JSON.stringify(gameOver))
      localStorage.setItem('score', JSON.stringify(score))
      localStorage.setItem('completeStates', JSON.stringify(completeStates))
    }
  }, [resetState, layerOne, layerTwo, layerThree, curLayer, strikeCounter, activeTiles, wildCard, gameOver, score, completeStates]);

  useEffect(() => {
    const resetGame = (shuffle) => {
      // Clear specific localStorage items.
      // This resets all states, but DOES NOT re-render the puzzle unless the page is refreshed.
      localStorage.removeItem('layerOne')
      localStorage.removeItem('layerTwo')
      localStorage.removeItem('layerThree')
      localStorage.removeItem('curLayer')
      localStorage.removeItem('strikeCounter')
      localStorage.removeItem('activeTiles')
      localStorage.removeItem('wildCard')
      localStorage.removeItem('gameOver')
      localStorage.removeItem('score')
      localStorage.removeItem('completeStates')

      // Directly reset completeStates to all false values
      setCompleteStates(Array(totalTiles).fill(false))

      if(shuffle) {
        setLayerOne(randPopulateLayer(boardDimension))
        setLayerTwo(randPopulateLayer(boardDimension))
        setLayerThree(randPopulateLayer(boardDimension))
        setCurLayer(layerOne)
      } else {
        // Assigns customLayer first (in case a new custom layer was passed)
        // If no new customLayer was passed then it should be the same as the old.
        // If no customLayer was passed in the first place, then resets to original.
        setLayerOne(isValidLayer(customLayer1) ? customLayer1 : layerOne)
        setLayerTwo(isValidLayer(customLayer2) ? customLayer2 : layerTwo)
        setLayerThree(isValidLayer(customLayer3) ? customLayer3 : layerThree)
        setCurLayer(isValidLayer(customLayer1) ? customLayer1 : layerOne)
      }
      setStrikeCounter(Array(boardDimension).fill(null).map(() => Array(boardDimension).fill(0)))
      setActiveTiles(Array(boardDimension).fill(null).map(() => Array(boardDimension).fill(true)))
      setWildCard([false, false])
      setGameOver(false)
      setScore(0)
      setCompleteStates(Array(totalTiles).fill(false))
    }

    if (resetState) {
      resetGame(shuffleOnReset);
      setResetState(false)
    }
  }, [resetState, setResetState, shuffleOnReset, customLayer1, customLayer2, customLayer3, layerOne, layerTwo, layerThree, totalTiles]);

  const scoreHandler = () => {
    setScore(score + 1)
    if(updateScore) updateScore(score)
  }

  const gameOverHandler = () => {
    setGameOver(true)
    if(updateGameOver) updateGameOver(false)
  }

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

  // Method to update a tile's complete state
  const setTileComplete = (index, value) => {
    const updatedStates = [...completeStates]
    updatedStates[index] = value
    setCompleteStates(updatedStates)
  }

  const tileClick = (type, i, j) => {
    incrementStrike(i, j)
    scoreHandler()

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
        if(activeTileCount === 0) gameOverHandler()
        setActiveTiles( Array(boardDimension).fill(null).map(() => Array(boardDimension).fill(true)))
        setActiveTiles(newTileStatus)
      } break

      case 'N': {     // knight
        let {newTileStatus, activeTileCount} = knightTileMovement(i, j, boardDimension, strikeCounter)
        if(activeTileCount === 0) gameOverHandler()
        setActiveTiles( Array(boardDimension).fill(null).map(() => Array(boardDimension).fill(true)))
        setActiveTiles(newTileStatus)
       } break

      case 'B': {     // bishop
        let {newTileStatus, activeTileCount} = bishopTileMovement(i, j, boardDimension, strikeCounter)
        if(activeTileCount === 0) gameOverHandler()
        setActiveTiles( Array(boardDimension).fill(null).map(() => Array(boardDimension).fill(true)))
        setActiveTiles(newTileStatus)
      } break

      case 'R': {     // rook
        let {newTileStatus, activeTileCount} = rookTileMovement(i, j, boardDimension, strikeCounter)
        if(activeTileCount === 0) gameOverHandler()
        setActiveTiles( Array(boardDimension).fill(null).map(() => Array(boardDimension).fill(true)))
        setActiveTiles(newTileStatus)
      } break

      case 'Q': {     // queen
        let {newTileStatus, activeTileCount} = queenTileMovement(i, j, boardDimension, strikeCounter)
        if(activeTileCount === 0) gameOverHandler()
        setActiveTiles( Array(boardDimension).fill(null).map(() => Array(boardDimension).fill(true)))
        setActiveTiles(newTileStatus)
      } break

      case 'W': {     // wildcard
        let {newTileStatus, activeTileCount} = wcTileMovement(i, j, boardDimension, strikeCounter)
        if(activeTileCount === 0) gameOverHandler()
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

      // calculate index for completeStates
      const index = i * boardDimension + j

      tileList[i][j] = <Tile
        key={k}
        type={curLayer[i][j]}
        active={activeTiles[i][j]}
        strikes={strikeCounter[i][j]}
        onClick={() => tileClick(curLayer[i][j], i, j)}
        score={score}
        complete={completeStates[index]}
        setComplete={() => setTileComplete(index, true)}

        tileOne={tileOne}
        tileTwo={tileTwo}
        tileThree={tileThree}
        tileComplete={tileComplete}
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
