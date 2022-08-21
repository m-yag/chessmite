import React from 'react'
import {CSSTransition} from 'react-transition-group'

const Tile = ({type, active, strikes, onClick}) => {

  if(strikes === 3) {
    return (
      <div className="tileContainer">
        <button className="tileButton" disabled>
        </button>
      </div>
    )
  }

  return (
    <div className="tileContainer">
      <button className='tileButton' onClick={onClick} disabled={!active}>

        <CSSTransition in={strikes === 2} timeout={1000} classNames="first-transition" unmountOnExit>
          <div className={`${active ? 'clickable' : 'unclickable'} tile tileThree`}>
            {type}
          </div>
        </CSSTransition>

        <CSSTransition in={strikes === 1} timeout={1000} classNames="first-transition" unmountOnExit>
          <div className={`${active ? 'clickable' : 'unclickable'} tile tileTwo`}>
            {type}
          </div>
        </CSSTransition>

        <CSSTransition in={strikes === 0} timeout={1000} classNames="first-transition" unmountOnExit>
          <div className={`${active ? 'clickable' : 'unclickable'} tile tileOne`}>
            {type}
          </div>
        </CSSTransition>

      </button>
    </div>
  )
}

export default Tile
