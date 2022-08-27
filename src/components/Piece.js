import React from 'react'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {fa1, fa2, fa3, fa4} from '@fortawesome/free-solid-svg-icons'
import {FaChessKnight, FaChessBishop, FaChessRook, FaChessQueen} from 'react-icons/fa'
import {GiFleurDeLys} from 'react-icons/gi'

const Piece = ({type}) => {

  switch(type) {
    case 1: return <FontAwesomeIcon icon={fa1} />
    case 2: return <FontAwesomeIcon icon={fa2} />
    case 3: return <FontAwesomeIcon icon={fa3} />
    case 4: return <FontAwesomeIcon icon={fa4} />
    case 'N': return <FaChessKnight />
    case 'B': return <FaChessBishop />
    case 'R': return <FaChessRook />
    case 'Q': return <FaChessQueen />
    case 'W': return <GiFleurDeLys />
    default: return {type}
  }
}

export default Piece
