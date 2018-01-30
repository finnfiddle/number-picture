import React from 'react';
import PropTypes from 'prop-types';

import { TWEENABLE_SVG_PRESENTATION_ATTRS } from './constants';
import { bindMouseEvents } from './util';
import AnimatedElement from './mixins/AnimatedElement';

export default class Line extends AnimatedElement {

  constructor(props) {
    super(props);
    this.displayName = 'Line';
  }

  getAttrNames() {
    return ['x1', 'x2', 'y1', 'y2'].concat(TWEENABLE_SVG_PRESENTATION_ATTRS);
  }

  render() {
    const { className } = this.props;
    return (
      <line
        {...this.state}
        className={className}
        style={this.getStyle(this.props)}
        {...bindMouseEvents(this.props)}
      />
    );
  }

}

Line.propTypes = {
  x1: PropTypes.oneOfType([PropTypes.func, PropTypes.number]).isRequired,
  x2: PropTypes.oneOfType([PropTypes.func, PropTypes.number]).isRequired,
  y1: PropTypes.oneOfType([PropTypes.func, PropTypes.number]).isRequired,
  y2: PropTypes.oneOfType([PropTypes.func, PropTypes.number]).isRequired,
};

Line.defaultProps = Object.assign({}, AnimatedElement.defaultProps);
