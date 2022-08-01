import React from 'react'

const Tile = ({type, active, strikes, onClick}) => {

  const tempStyle = {
    fontSize: 16,
    fontWeight: 700,
    borderStyle: "none",
    display: "block",
    width: "78px",
    height: "98%",
  }

  const getStrikeColor = (strikes) => {
    if(strikes === 0) {
      return 'zeroStrike'
    } else if(strikes === 1) {
      return 'oneStrike'
    } else if(strikes === 2) {
      return 'twoStrike'
    } else {
      return 'threeStrike'
    }
  }

  if(strikes === 3) {
    return (
      <div>
        <button style={tempStyle} disabled>X</button>
      </div>
    )
  }

  return (
    <div>
      <button
        className= {`${active ? 'clickable' : 'unclickable'} ${getStrikeColor(strikes)}`}
        onClick={onClick}
        disabled={!active}
        style={tempStyle}
      >

          {type}

      </button>
    </div>
  )
}

export default Tile
