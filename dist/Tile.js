import React from 'react';
import { CSSTransition } from 'react-transition-group';

const Tile = ({
  type,
  active,
  strikes,
  onClick
}) => {
  if (strikes === 3) {
    return /*#__PURE__*/React.createElement("div", {
      className: "tileContainer"
    }, /*#__PURE__*/React.createElement("button", {
      className: "tileButton",
      disabled: true
    }));
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "tileContainer"
  }, /*#__PURE__*/React.createElement("button", {
    className: "tileButton",
    onClick: onClick,
    disabled: !active
  }, /*#__PURE__*/React.createElement(CSSTransition, {
    in: strikes === 2,
    timeout: 1000,
    classNames: "first-transition",
    unmountOnExit: true
  }, /*#__PURE__*/React.createElement("div", {
    className: `${active ? 'clickable' : 'unclickable'} tile tileThree`
  }, type)), /*#__PURE__*/React.createElement(CSSTransition, {
    in: strikes === 1,
    timeout: 1000,
    classNames: "first-transition",
    unmountOnExit: true
  }, /*#__PURE__*/React.createElement("div", {
    className: `${active ? 'clickable' : 'unclickable'} tile tileTwo`
  }, type)), /*#__PURE__*/React.createElement(CSSTransition, {
    in: strikes === 0,
    timeout: 1000,
    classNames: "first-transition",
    unmountOnExit: true
  }, /*#__PURE__*/React.createElement("div", {
    className: `${active ? 'clickable' : 'unclickable'} tile tileOne`
  }, type))));
};

export default Tile;