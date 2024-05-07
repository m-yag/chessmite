import React from 'react'
//import {useState} from 'react'
import {CSSTransition} from 'react-transition-group'
import Piece from './Piece'

const Tile = ({
  type, active, strikes, onClick, score, complete, setComplete,
  tileOne, tileTwo, tileThree, tileComplete
  }) => {

  return (
    <div className="tileContainer">
      <button className='tileButton' onClick={() => {onClick(); if(strikes === 2) setComplete()}} disabled={complete ? true : !active}>

        <CSSTransition in={strikes === 3} timeout={500} classNames="first-transition" unmountOnExit>
          <div style={{background: `${tileComplete}`}} className="tile tileComplete">
          </div>
        </CSSTransition>

        <CSSTransition in={strikes === 2} timeout={500} classNames="first-transition" onExit={() => setComplete(true)} unmountOnExit>
          <div style={{background: `${tileThree}`}} className={`${active ? 'clickableThree' : 'unclickable'} tile tileThree`}>
            <Piece type={type}/>
          </div>
        </CSSTransition>

        <CSSTransition in={strikes === 1} timeout={500} classNames="first-transition" unmountOnExit>
          <div style={{background: `${tileTwo}`}} className={`${active ? 'clickableTwo' : 'unclickable'} tile tileTwo`}>
            <Piece type={type}/>
          </div>
        </CSSTransition>

        <CSSTransition in={strikes === 0} timeout={500} classNames="first-transition" unmountOnExit>
          <div style={{background: `${tileOne}`}} className={`${ score === 0 ? '' : active ? 'clickableOne' : 'unclickable'} tile tileOne`}>
            <Piece type={type}/>
          </div>
        </CSSTransition>

      </button>
    </div>
  )
}

export default Tile
