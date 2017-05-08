import React, { PropTypes } from 'react';
import stamp from 'react-stamp';
import itsSet from 'its-set';
import isFunction from 'lodash/isFunction';
import pick from 'lodash/pick';

import Shape from './Shape';

export default stamp(React).compose(Shape, {

  displayName: 'Circle',

  getAttrNames() {
    return ['cx', 'cy', 'fill', 'stroke', 'r'];
  },

  render() {
    return (
      <circle {...this.state} />
    );
  },

});
