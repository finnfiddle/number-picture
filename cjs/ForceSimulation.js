'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d3Force = require('d3-force');

var _itsSet = require('its-set');

var _itsSet2 = _interopRequireDefault(_itsSet);

var _util = require('./util');

var _TransitionGroup = require('./TransitionGroup');

var _TransitionGroup2 = _interopRequireDefault(_TransitionGroup);

var _SelectSelf2 = require('./mixins/SelectSelf');

var _SelectSelf3 = _interopRequireDefault(_SelectSelf2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ForceSimulation = function (_SelectSelf) {
  (0, _inherits3.default)(ForceSimulation, _SelectSelf);

  function ForceSimulation(props) {
    (0, _classCallCheck3.default)(this, ForceSimulation);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ForceSimulation.__proto__ || (0, _getPrototypeOf2.default)(ForceSimulation)).call(this, props));

    _this.displayName = 'ForceSimulation';
    _this.state = {};
    _this.forces = _this.props.forces;
    return _this;
  }

  (0, _createClass3.default)(ForceSimulation, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.forces = nextProps.forces;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var _this2 = this;

      setTimeout(function () {
        _this2.getSimulation();
      });
    }
  }, {
    key: 'getSimulation',
    value: function getSimulation() {
      var _this3 = this;

      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      var _props = this.props,
          nodes = _props.nodes,
          links = _props.links,
          forces = _props.forces,
          onTick = _props.onTick,
          onEnd = _props.onEnd,
          running = _props.running;


      this.simulation = (0, _d3Force.forceSimulation)();
      this.simulation.nodes(nodes);

      ['alpha', 'alphaMin', 'alphaDecay', 'alphaTarget', 'velocityDecay'].forEach(function (key) {
        if ((0, _itsSet2.default)(_this3.props[key])) _this3.simulation[key](_this3.props[key]);
      });

      this.applyForces(forces, this.simulation);

      var graphNodes = this.selectSelf().selectAll('.node').data(this.simulation.nodes());

      var graphLinks = this.selectSelf().selectAll('.link').data(links);

      this.simulation.on('tick', function () {
        onTick({ nodes: _this3.simulation.nodes(), links: links });
        graphNodes.attr('cx', function (d) {
          return d.x;
        });
        graphNodes.attr('cy', function (d) {
          return d.y;
        });
        graphLinks.attr('x1', function (d) {
          return d.source.x;
        });
        graphLinks.attr('y1', function (d) {
          return d.source.y;
        });
        graphLinks.attr('x2', function (d) {
          return d.target.x;
        });
        graphLinks.attr('y2', function (d) {
          return d.target.y;
        });
        // graphNodes.attr('r', d => d.r);
      });

      this.simulation.on('end', function () {
        onEnd({ nodes: _this3.simulation.nodes(), links: links });
        callback();
      });

      if (!running) {
        this.simulation.stop();
      }
    }
  }, {
    key: 'applyForces',
    value: function applyForces(forces, simulation) {
      (0, _keys2.default)(forces).concat((0, _keys2.default)(this.forces)).forEach(function (key) {
        if ((0, _itsSet2.default)(forces[key])) {
          simulation.force(key, forces[key]);
        } else {
          simulation.force(key, null);
        }
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount(callback) {
      this.getSimulation(callback);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.simulation.stop();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _TransitionGroup2.default,
        null,
        this.renderChildren()
      );
    }
  }, {
    key: 'renderChildren',
    value: function renderChildren() {
      var _props2 = this.props,
          nodes = _props2.nodes,
          node = _props2.node,
          links = _props2.links,
          link = _props2.link,
          id = _props2.id;

      return nodes.reduce(function (acc, datum, index) {
        var key = id(datum);
        return acc.concat(_react.Children.map(node, function (child) {
          return (0, _react.cloneElement)(child, {
            datum: datum,
            index: index,
            data: nodes,
            key: key,
            _key: key,
            className: (node.className || '') + ' node'
          });
        }));
      }, links.reduce(function (acc, datum, index) {
        var key = datum.source.id + '_' + datum.target.id;
        return acc.concat(_react.Children.map(link, function (child) {
          return (0, _react.cloneElement)(child, {
            datum: datum,
            index: index,
            data: links,
            key: key,
            _key: key,
            className: (link.className || '') + ' link'
          });
        }));
      }, []));
    }
  }, {
    key: 'normalizeLinks',
    value: function normalizeLinks(links) {
      return (0, _util.isObject)(links[links.length - 1].source) ? links : links.map(function (link) {
        return {
          source: {
            id: link.source,
            x: 0,
            y: 0,
            vx: 0,
            vy: 0
          },
          target: {
            id: link.target,
            x: 0,
            y: 0,
            vx: 0,
            vy: 0
          }
        };
      });
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.simulation.stop();
    }
  }, {
    key: 'restart',
    value: function restart() {
      this.simulation.restart();
    }
  }, {
    key: 'tick',
    value: function tick() {
      this.simulation.tick();
    }
  }]);
  return ForceSimulation;
}(_SelectSelf3.default);

exports.default = ForceSimulation;


ForceSimulation.propTypes = {
  nodes: _propTypes2.default.array.isRequired,
  links: _propTypes2.default.array,
  forces: _propTypes2.default.object,
  node: _propTypes2.default.node.isRequired,
  link: _propTypes2.default.node,
  alpha: _propTypes2.default.number,
  alphaMin: _propTypes2.default.number,
  alphaDecay: _propTypes2.default.number,
  alphaTarget: _propTypes2.default.number,
  velocityDecay: _propTypes2.default.number,
  onTick: _propTypes2.default.func,
  onEnd: _propTypes2.default.func,
  running: _propTypes2.default.bool
};

ForceSimulation.defaultProps = {
  onTick: function onTick() {},
  onEnd: function onEnd() {},
  id: function id(datum) {
    return datum.index;
  },
  nodes: [],
  links: [],
  forces: {},
  node: null,
  link: null,
  running: true
};