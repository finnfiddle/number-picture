import React, { Children, cloneElement } from 'react';
import stamp from 'react-stamp';
import { pie } from 'd3-shape';
import itsSet from 'its-set';
import ReactTransitionGroup from 'react-addons-transition-group';

export default stamp(React).compose({

  displayName: 'Pie',

  propTypes: {
    // value
    // sort
    // sortValues
    // startAngle
    // endAngle
    // padAngle
    // data
  },

  // init() {
  //   this.state = { data: this.props.data };
  // },
  //
  // componentWillReceiveProps(nextProps) {
  //   const { data } = nextProps;
  //   if (data.length > this.props.data.length) {
  //     const diff = data.length - this.props.data.length;
  //     this.setState({
  //       data: data.slice(0, this.props.data.length).concat(
  //         data.slice(this.props.data.length).map(datum =>
  //           Object.assign({}, datum, { override: 0 })
  //         )
  //       )
  //     }, () => {
  //       this.setState({ data });
  //     });
  //   }
  //   else {
  //     this.setState({ data });
  //   }
  // },

  render() {
    return (
      <ReactTransitionGroup component='g'>
        {this.renderChildren()}
      </ReactTransitionGroup>
    );
  },

  renderChildren() {
    const { data, children } = this.props;
    const pieData = this.getPie()(data);
    return pieData.reduce((acc, datum, index) =>
      acc.concat(Children.map(children, (child, c) =>
        cloneElement(child, {
          datum,
          index,
          data: pieData,
          key: `${index}_${c}`,
          _key: `${index}_${c}`,
        })
      ))
    , []);
  },

  getPie() {
    let p = pie();
    [
      'value',
      'sort',
      'sortValues',
      'startAngle',
      'endAngle',
      'padAngle',
    ].forEach((key) => {
      if (itsSet(this.props[key])) p = p[key](this.props[key]);
    });
    return p;
  },

});
