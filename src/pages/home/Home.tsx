import { Axis, Chart, Geom, Legend, Tooltip } from 'bizcharts';
import { inject, observer } from 'mobx-react';

import HomeStore from '../../stores/HomeStore';
import React from 'react';

interface HomeProps {
  homeStore?: HomeStore;
}

@inject('homeStore')
@observer
export default class Home extends React.Component<HomeProps> {
  render() {

    const { data, cols } = this.props.homeStore!; 

    return (
      <Chart width={600} height={400} data={data} scale={cols}>
        <Axis name="genre" title />
        <Axis name="sold" title />
        <Legend position="top" />
        <Tooltip />
        <Geom type="interval" position="genre*sold" color="genre" />
      </Chart>
    );
  }
}
