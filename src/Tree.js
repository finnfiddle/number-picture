import PropTypes from 'prop-types';
import { tree, hierarchy } from 'd3-hierarchy';

import { flattenHierarchy } from './util';
import Layout from './Layout';

export default class Pack extends Layout {

  static displayName = 'Tree';

  static propTypes = {
    separation: PropTypes.number,
    size: PropTypes.arrayOf(PropTypes.number),
    nodeSize: PropTypes.number,
    data: PropTypes.object.isRequired,
    includeRoot: PropTypes.bool,
    sum: PropTypes.func,
  };

  static defaultProps = {
    ...Layout.defaultProps,
    includeRoot: true,
    sum: d => d.value,
  };

  getSchema() {
    return {
      layout: tree,
      layoutProps: ['nodeSize', 'size', 'separation'],
      selectStylesToTween: d => ({
        x: d.x,
        y: d.y,
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
