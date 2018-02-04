import PropTypes from 'prop-types';
import { area } from 'd3-shape';
import itsSet from 'its-set';

import Element from './Element';

export default class Line extends Element {

  static displayName = 'Line';

  static propTypes = {
    x: PropTypes.number,
    x0: PropTypes.number,
    x1: PropTypes.number,
    y: PropTypes.number,
    y0: PropTypes.number,
    y1: PropTypes.number,
    defined: PropTypes.number,
    curve: PropTypes.number,
    context: PropTypes.number,
    lineX0: PropTypes.number,
    lineY0: PropTypes.number,
    lineX1: PropTypes.number,
    lineY1: PropTypes.number,
  };

  static defaultProps = {
    ...Element.defaultProps,
    component: 'path',
  };

  getSchema() {
    return {
      d: {
        get inputs() {
          return ['innerRadius', 'outerRadius', 'startAngle', 'endAngle'];
        },
        calculation(props) {
          let calc = area();
          const keys = this.inputs;
          keys.forEach(attrName => {
            if (itsSet(props[attrName])) {
              calc = calc[attrName](props[attrName]);
            }
          });
          return calc();
        },
      },
    };
  }

}
