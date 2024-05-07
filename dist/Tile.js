import React from 'react'; //import {useState} from 'react'

import { CSSTransition } from 'react-transition-group';
import Piece from './Piece';

const Tile = ({
  type,
  active,
  strikes,
  onClick,
  score,
  complete,
  setComplete,
  tileOne,
  tileTwo,
  tileThree,
  tileComplete
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "tileContainer"
  }, /*#__PURE__*/React.createElement("button", {
    className: "tileButton",
    onClick: () => {
      onClick();
      if (strikes === 2) setComplete();
    },
    disabled: complete ? true : !active
  }, /*#__PURE__*/React.createElement(CSSTransition, {
    in: strikes === 3,
    timeout: 500,
    classNames: "first-transition",
    unmountOnExit: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: `${tileComplete}`
    },
    className: "tile tileComplete"
  })), /*#__PURE__*/React.createElement(CSSTransition, {
    in: strikes === 2,
    timeout: 500,
    classNames: "first-transition",
    onExit: () => setComplete(true),
    unmountOnExit: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: `${tileThree}`
    },
    className: `${active ? 'clickableThree' : 'unclickable'} tile tileThree`
  }, /*#__PURE__*/React.createElement(Piece, {
    type: type
  }))), /*#__PURE__*/React.createElement(CSSTransition, {
    in: strikes === 1,
    timeout: 500,
    classNames: "first-transition",
    unmountOnExit: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: `${tileTwo}`
    },
    className: `${active ? 'clickableTwo' : 'unclickable'} tile tileTwo`
  }, /*#__PURE__*/React.createElement(Piece, {
    type: type
  }))), /*#__PURE__*/React.createElement(CSSTransition, {
    in: strikes === 0,
    timeout: 500,
    classNames: "first-transition",
    unmountOnExit: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: `${tileOne}`
    },
    className: `${score === 0 ? '' : active ? 'clickableOne' : 'unclickable'} tile tileOne`
  }, /*#__PURE__*/React.createElement(Piece, {
    type: type
  })))));
};

export default Tile;