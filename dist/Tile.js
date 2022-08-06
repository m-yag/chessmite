import React from 'react';

const Tile = ({
  type,
  active,
  strikes,
  onClick
}) => {
  const tempStyle = {
    fontSize: 16,
    fontWeight: 700,
    display: "block",
    //    width: "78px",
    //    height: "98%",
    width: "14.6vmin",
    height: "14.6vmin"
  };

  const getStrikeColor = strikes => {
    if (strikes === 0) {
      return 'zeroStrike';
    } else if (strikes === 1) {
      return 'oneStrike';
    } else if (strikes === 2) {
      return 'twoStrike';
    } else {
      return 'threeStrike';
    }
  };

  if (strikes === 3) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
      style: tempStyle,
      disabled: true
    }, "X"));
  }

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    className: `${active ? 'clickable' : 'unclickable'} ${getStrikeColor(strikes)}`,
    onClick: onClick,
    disabled: !active,
    style: tempStyle
  }, type));
};

export default Tile;