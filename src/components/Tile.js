import React from 'react'
import {useState} from 'react'
import {CSSTransition} from 'react-transition-group'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fa1, fa2, fa3, fa4} from '@fortawesome/free-solid-svg-icons'
import {FaChessKnight, FaChessBishop, FaChessRook, FaChessQueen} from 'react-icons/fa'
import {GiFleurDeLys} from 'react-icons/gi'

const Tile = ({type, active, strikes, onClick}) => {

  const [complete, setComplete] = useState(false)

  switch(type) {
    case 1:
      type = <FontAwesomeIcon icon={fa1} />
      break;
    case 2:
      type = <FontAwesomeIcon icon={fa2} />
      break
    case 3:
      type = <FontAwesomeIcon icon={fa3} />
      break
    case 4:
      type = <FontAwesomeIcon icon={fa4} />
      break
    case 'N':
      type = <FaChessKnight />
      break
    case 'B':
      type = <FaChessBishop />
      break
    case 'R':
      type = <FaChessRook />
      break
    case 'Q':
      type = <FaChessQueen />
      break
    case 'W':
      type = <GiFleurDeLys />
      break
    default:
      type = '?'
  }

  return (
    <div className="tileContainer">
      <button className='tileButton' onClick={onClick} disabled={complete ? true : !active}>

        <CSSTransition in={strikes === 3} timeout={500} classNames="first-transition" unmountOnExit>
          <div className="tile tileComplete">
          </div>
        </CSSTransition>

        <CSSTransition in={strikes === 2} timeout={500} classNames="first-transition" onExit={() => setComplete(true)} unmountOnExit>
          <div className={`${active ? 'clickable' : 'unclickable'} tile tileThree`}>
            {type}
          </div>
        </CSSTransition>

        <CSSTransition in={strikes === 1} timeout={500} classNames="first-transition" unmountOnExit>
          <div className={`${active ? 'clickable' : 'unclickable'} tile tileTwo`}>
            {type}
          </div>
        </CSSTransition>

        <CSSTransition in={strikes === 0} timeout={500} classNames="first-transition" unmountOnExit>
          <div className={`${active ? 'clickable' : 'unclickable'} tile tileOne`}>
            {type}
          </div>
        </CSSTransition>

      </button>
    </div>
  )
}

export default Tile
