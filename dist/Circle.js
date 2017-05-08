'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactStamp = require('react-stamp');

var _reactStamp2 = _interopRequireDefault(_reactStamp);

var _itsSet = require('its-set');

var _itsSet2 = _interopRequireDefault(_itsSet);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _pick = require('lodash/pick');

var _pick2 = _interopRequireDefault(_pick);

var _Shape = require('./Shape');

var _Shape2 = _interopRequireDefault(_Shape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _reactStamp2.default)(_react2.default).compose(_Shape2.default, {

  displayName: 'Circle',

  getAttrNames: function getAttrNames() {
    return ['cx', 'cy', 'fill', 'stroke', 'r'];
  },
  render: function render() {
    return _react2.default.createElement('circle', this.state);
  }
});