# Chessmite

Chessmite is a tile-based puzzle game, featuring chess-like mechanics. It is inspired by a childhood puzzle
classic. This game is packaged as a React component and designed to offer an engaging and strategic
puzzle-solving experience.

The game can be found and played on the [official website](https://chessmite.com).

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [How to Play](#how-to-play)
- [License](#license)

## Installation

```bash
npm install chessmite
```

## Usage

```javascript
import React from 'react'
import Chessmite from 'chessmite'

const App = () => {
  return (
    <div>
      <Chessmite />
    </div>
  )
}
```

### Props

#### <em>displayScore</em> - boolean

Displays the score (and a 'Game Over' message):
```html
<Chessmite displayScore={true} />
```


#### <em>tileOne</em> - string
#### <em>tileTwo</em> - string
#### <em>tileThree</em> - string
#### <em>tileComplete</em> - string
Overrides default colour of specified tile layer:
```html
<Chessmite tileOne='#CCCCFF' />
```

#### <em>customLayer1</em> - object (array)
#### <em>customLayer2</em> - object (array)
#### <em>customLayer3</em> - object (array)
Sets board layer to a custom arrangment:
```javascript
const myLayer = [
  [1, 1, 1, 1, 1, 1],
  [2, 2, 2, 2, 2, 2],
  [3, 3, 3, 3, 3, 3],
  [4, 4, 4, 4, 4, 4],
  ['N','B','R','Q', 'W'],
  [1, 1, 1, 1, 1, 1]
];

return (
  <Chessmite customLayer1={myLayer} />
)
```
A layer must be a 6x6 array. Valid number tiles include numbers **1-4**. Valid chess tiles include **'N'**, **'B'**, **'R'**, & **'Q'** (knight, bishop, rook, and queen, respectively). Lastly, the wildcard tile: **'W'**.

Note: The game produces a wildcard tile whenever a layer is completed, regardless of customization.


#### <em>updateScore</em> - object (function)
Pass your own score handler:
```html
<Chessmite updateScore={myScoreHandler}/>
```
Note: This is largely intended to allow a custom display of the score. Any complex changes to the scoring system would likely require tinkering with the source code.

#### <em>updateGameOver</em> - object (function)
Pass your own 'game over' handler:
```html
<Chessmite updateGameOver={myGameOverHandler} />
```

#### <em>persistMode</em> - boolean
Saves puzzle progress:
```html
<Chessmite persistMode={true} />
```
States will not reset upon closing or refreshing page (even if the cache is cleared). This is intended to be used in conjuction with <em>resetState</em>. Otherwise, clearing local storage is required.

#### <em>resetState</em> - boolean (state)
#### <em>setResetState</em> - object (setter)
Resets puzzle:
```javascript
const [reset, setReset] = useState(false)
const handleReset = () => {
  setReset(true)      // triggers reset
}

return (
  <div>
    <Chessmite persistMode={true} resetState={reset} setResetState={setReset} />
    <button onClick={handleReset}>Reset Game</button>
  </div>
)
```
Note: For the component to correctly reset the puzzle, both the state and it's corresponding setter are required. In other words using <em>resetState</em> alone is not enough.

#### <em>shuffleOnReset</em> - boolean
Generates new random board on reset:
```html
<Chessmite persistMode={true} resetState={reset} setResetState={setReset} shuffleOnReset={true} />
```

## How to Play

<p align="center">
  <img width=400 src="https://github.com/m-yag/Chessmite/blob/media/board.png?raw=true">
</p>

#### Objective

The objective of the puzzle is to clear the board by clicking each square three times. When a square is clicked three times, it becomes "complete" and can no longer be used. The puzzle ends when all squares are completed **or** when no valid moves are available.

#### Gameplay

You start with a board of 36 grey squares. Each square can be clicked up to three times:
* **First click:** The square turns from grey to green.
* **Second click:** The square turns from green to orange.
* **Third click:** The square is 'complete' and becomes unclickable.

<div align="center">
  <img width=300 src="https://github.com/m-yag/Chessmite/blob/media/tile-colors.png?raw=true">
  <p>grey → green → orange → complete</p>
</div>

The initial move can be made by clicking any square. Subsequent moves are determined by the symbol on the last clicked square. Each time a square is clicked, it is replaced by a new square with a random symbol.

#### Pieces

There are two sets of pieces: numeric (1, 2, 3, 4) and chess pieces (Knight, Bishop, Rook, and Queen). These symbols indicate which squares may be clicked next. If a destination square is already 'completed' or beyond the puzzle's border, that move is invalid. Destination squares, if available, are highlighted.

##### Numeric Pieces

A number on a square indicates the distance to the next clickable square. For example, clicking a 2 allows the player to click any available square exactly 2 squares away horizontally, vertically, or diagonally.
<div align="center">
<img width="250" src="https://github.com/m-yag/Chessmite/blob/media/two-example.png?raw=true">
</div>

##### Chess Pieces

Chess pieces move as they do in chess:
* **Bishop:** Moves diagonally to the border.
* **Rook:** Moves vertically or horizontally to the border.
* **Knight:** Moves in an "L" shape (2 x 1 squares or 1 x 2 squares).
* **Queen:** Moves diagonally, vertically, or horizontally to the border.

Except for the Knight, pieces always move to the board's edge and cannot stop midway. The next click cannot be on the same square as the previous one.
<div align="center">
<img width="250" src="https://github.com/m-yag/Chessmite/blob/media/rook-example.png?raw=true">
</div>

##### Wild Card

The fleur-de-lis (⚜) is a wild card tile allowing any incomplete square (except itself) to be clicked. The wild card appears when all squares of a color have been flipped. The last square of a particular color to be flipped will reveal the fleur-de-lis.
<div align="center">
  <img width=75 src="https://github.com/m-yag/Chessmite/blob/media/wildcard.png?raw=true">
  <p>wild card</p>
</div>

## License
This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/)
