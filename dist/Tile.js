import React from 'react';
import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Piece from './Piece';

const Tile = ({
  type,
  active,
  strikes,
  onClick
}) => {
  const [complete, setComplete] = useState(false);
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
    className: `${active ? 'clickable tileThreeFilter' : 'unclickable'} tile tileThree`
  }, /*#__PURE__*/React.createElement(Piece, {
    type: type
  }))), /*#__PURE__*/React.createElement(CSSTransition, {
    in: strikes === 1,
    timeout: 500,
    classNames: "first-transition",
    unmountOnExit: true
  }, /*#__PURE__*/React.createElement("div", {
    className: `${active ? 'clickable tileTwoFilter' : 'unclickable'} tile tileTwo`
  }, /*#__PURE__*/React.createElement(Piece, {
    type: type
  }))), /*#__PURE__*/React.createElement(CSSTransition, {
    in: strikes === 0,
    timeout: 500,
    classNames: "first-transition",
    unmountOnExit: true
  }, /*#__PURE__*/React.createElement("div", {
    className: `${active ? 'clickable' : 'unclickable'} tile tileOne`
  }, /*#__PURE__*/React.createElement(Piece, {
    type: type
  })))));
};

export default Tile;