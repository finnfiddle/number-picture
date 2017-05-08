'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactStamp = require('react-stamp');

var _reactStamp2 = _interopRequireDefault(_reactStamp);

var _d3Shape = require('d3-shape');

var _itsSet = require('its-set');

var _itsSet2 = _interopRequireDefault(_itsSet);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _Shape = require('./Shape');

var _Shape2 = _interopRequireDefault(_Shape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _reactStamp2.default)(_react2.default).compose(_Shape2.default, {

  displayName: 'Arc',

  getAttrNames: function getAttrNames() {
    return ['fill'];
  },
  getDerivedAttrNames: function getDerivedAttrNames() {
    return ['d'];
  },
  getDerivedAttr: function getDerivedAttr(key) {
    var _this = this;

    switch (key) {
      case 'd':
        return function (props) {
          var generator = (0, _d3Shape.arc)();
          ['innerRadius', 'outerRadius', 'startAngle', 'endAngle'].forEach(function (attrName) {
            if ((0, _itsSet2.default)(props[attrName])) {
              generator = generator[attrName](_this.getValue(attrName, props));
            }
          });
          return generator(props);
        };
    };
  },
  render: function render() {
    return _react2.default.createElement('path', this.state);
  }
});