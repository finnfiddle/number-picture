import PropTypes from 'prop-types';
import { treemap, hierarchy } from 'd3-hierarchy';

import { flattenHierarchy } from './util';
import Layout from './Layout';

export default class Pack extends Layout {

  static displayName = 'Tree';

  static propTypes = {
    data: PropTypes.object.isRequired,
    keys: PropTypes.number,
    value: PropTypes.number,
    order: PropTypes.number,
    offset: PropTypes.func,
  };

  static defaultProps = {
    ...Layout.defaultProps,
    includeRoot: true,
    sum: d => d.value,
  };

  getSchema() {
    return {
      layout: treemap,
      layoutProps: [
        'keys',
        'value',
        'order',
        'offset',
      ],
      selectStylesToTween: d => ({
        x0: d.x0,
        y0: d.y0,
        x1: d.x1,
        y1: d.y1,
      }),
    };
  }

  getData() {
    const { data, sum, includeRoot } = this.props;
    return flattenHierarchy(
      this.getLayout()(
        hierarchy(data).sum(sum)
      )
    )
    .slice(includeRoot ? 0 : 1);
  }
}
