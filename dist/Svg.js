'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactStamp = require('react-stamp');

var _reactStamp2 = _interopRequireDefault(_reactStamp);

var _helpers = require('./helpers');

var _TransitionGroup = require('./TransitionGroup');

var _TransitionGroup2 = _interopRequireDefault(_TransitionGroup);

var _AnimatedElement = require('./AnimatedElement');

var _AnimatedElement2 = _interopRequireDefault(_AnimatedElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _reactStamp2.default)(_react2.default).compose(_AnimatedElement2.default, {

  displayName: 'Svg',

  render: function render() {
    return _react2.default.createElement(
      'svg',
      (0, _extends3.default)({}, this.state, { style: this.getStyle(this.props) }, (0, _helpers.bindMouseEvents)(this.props)),
      _react2.default.createElement(
        _TransitionGroup2.default,
        null,
        this.props.children
      )
    );
  }
});