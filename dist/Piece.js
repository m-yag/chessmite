import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fa1, fa2, fa3, fa4 } from '@fortawesome/free-solid-svg-icons';
import { FaChessKnight, FaChessBishop, FaChessRook, FaChessQueen } from 'react-icons/fa';
import { GiFleurDeLys } from 'react-icons/gi';

const Piece = ({
  type
}) => {
  switch (type) {
    case 1:
      return /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        icon: fa1
      });

    case 2:
      return /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        icon: fa2
      });

    case 3:
      return /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        icon: fa3
      });

    case 4:
      return /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        icon: fa4
      });

    case 'N':
      return /*#__PURE__*/React.createElement(FaChessKnight, null);

    case 'B':
      return /*#__PURE__*/React.createElement(FaChessBishop, null);

    case 'R':
      return /*#__PURE__*/React.createElement(FaChessRook, null);

    case 'Q':
      return /*#__PURE__*/React.createElement(FaChessQueen, null);

    case 'W':
      return /*#__PURE__*/React.createElement(GiFleurDeLys, null);

    default:
      return {
        type
      };
  }
};

export default Piece;