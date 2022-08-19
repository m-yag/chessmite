import React from 'react'; //import {CSSTransition} from 'react-transition-group'

const Tile = ({
  type,
  active,
  strikes,
  onClick
}) => {
  const getTileClass = strikes => {
    if (strikes === 0) {
      return 'tileOne';
    } else if (strikes === 1) {
      return 'tileTwo';
    } else if (strikes === 2) {
      return 'tileThree';
    } else {
      return '';
    }
  };

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
  }, /*#__PURE__*/React.createElement("div", {
    className: `${active ? 'clickable' : 'unclickable'} tile ${getTileClass(strikes)}`
  }, type))); //OLD
  //  return (
  //    <div>
  //      <button
  //        className= {`${active ? 'clickable' : 'unclickable'} ${getStrikeColor(strikes)}`}
  //        onClick={onClick}
  //        disabled={!active}
  //        style={tempStyle}
  //      >
  //        <CSSTransition
  //          in={strikes === 0}
  //          timeout={1000}
  //          classNames="zeroStrike-transition"
  //        >
  //          <div className="tile">
  //            {type}
  //          </div>
  //
  //        </CSSTransition>
  //      </button>
  //    </div>
  //  )
};

export default Tile;