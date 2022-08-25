import React from 'react';
import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fa1, fa2, fa3, fa4 } from '@fortawesome/free-solid-svg-icons';
import { FaChessKnight, FaChessBishop, FaChessRook, FaChessQueen } from 'react-icons/fa';
import { GiFleurDeLys } from 'react-icons/gi';

const Tile = ({
  type,
  active,
  strikes,
  onClick
}) => {
  const [complete, setComplete] = useState(false);

  switch (type) {
    case 1:
      type = /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        icon: fa1
      });
      break;

    case 2:
      type = /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        icon: fa2
      });
      break;

    case 3:
      type = /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        icon: fa3
      });
      break;

    case 4:
      type = /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        icon: fa4
      });
      break;

    case 'N':
      type = /*#__PURE__*/React.createElement(FaChessKnight, null);
      break;

    case 'B':
      type = /*#__PURE__*/React.createElement(FaChessBishop, null);
      break;

    case 'R':
      type = /*#__PURE__*/React.createElement(FaChessRook, null);
      break;

    case 'Q':
      type = /*#__PURE__*/React.createElement(FaChessQueen, null);
      break;

    case 'W':
      type = /*#__PURE__*/React.createElement(GiFleurDeLys, null);
      break;

    default:
      type = '?';
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "tileContainer"
  }, /*#__PURE__*/React.createElement("button", {
    className: "tileButton",
    onClick: onClick,
    disabled: complete ? true : !active
  }, /*#__PURE__*/React.createElement(CSSTransition, {
    in: strikes === 3,
    timeout: 500,
    classNames: "first-transition",
    unmountOnExit: true
  }, /*#__PURE__*/React.createElement("div", {
    className: "tile tileComplete"
  })), /*#__PURE__*/React.createElement(CSSTransition, {
    in: strikes === 2,
    timeout: 500,
    classNames: "first-transition",
    onExit: () => setComplete(true),
    unmountOnExit: true
  }, /*#__PURE__*/React.createElement("div", {
    className: `${active ? 'clickable' : 'unclickable'} tile tileThree`
  }, type)), /*#__PURE__*/React.createElement(CSSTransition, {
    in: strikes === 1,
    timeout: 500,
    classNames: "first-transition",
    unmountOnExit: true
  }, /*#__PURE__*/React.createElement("div", {
    className: `${active ? 'clickable' : 'unclickable'} tile tileTwo`
  }, type)), /*#__PURE__*/React.createElement(CSSTransition, {
    in: strikes === 0,
    timeout: 500,
    classNames: "first-transition",
    unmountOnExit: true
  }, /*#__PURE__*/React.createElement("div", {
    className: `${active ? 'clickable' : 'unclickable'} tile tileOne`
  }, type))));
};

export default Tile;