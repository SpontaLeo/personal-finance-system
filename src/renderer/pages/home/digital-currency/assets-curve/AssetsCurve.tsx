import './AssetsCurve.scss';

import { Axis, Chart, Geom, Legend, Tooltip } from 'bizcharts';
import { inject, observer } from 'mobx-react';

import DigitalCurrencyModel from '../../../../models/DigitalCurrencyModel';
import DigitalCurrencyStore from '../../../../stores/DigitalCurrencyStore';
import React from 'react';

interface AssetsCurveProps {
  digitalCurrencyStore?: DigitalCurrencyStore;
}

interface AssetsCurveState {
  selectedYear: string;
}

@inject('digitalCurrencyStore')
@observer
export default class AssetsCurve extends React.Component<
  AssetsCurveProps,
  AssetsCurveState
> {
  constructor(props: AssetsCurveProps) {
    super(props);
    this.state = {
      selectedYear: props.digitalCurrencyStore!.selectedDate.format('YYYY'),
    };
  }

  private chartData() {
    const { digitalCurrencyData } = this.props.digitalCurrencyStore!;
    const { selectedYear } = this.state;

    let data: any[] = [];
    const matchedYearData = digitalCurrencyData[selectedYear];
    if (matchedYearData) {
      Object.keys(matchedYearData).forEach(key => {
        const monthData: DigitalCurrencyModel = matchedYearData[key];
        data.push({
          month: key,
          binance: monthData.binance,
          okex: monthData.okex,
          huobi: monthData.huobi,
          hopex: monthData.hopex,
          total: monthData.total,
        });
      });
    }

    return data;
  }

  render() {
    return (
      <div className="assets-curve">
        {this.chartData().length !== 0 ? (
          <Chart height={500} data={this.chartData()} padding="auto" forceFit>
            <Legend position="top-right" layout="vertical" />
            <Axis name="month" />
            <Axis
              name="binance"
              label={{
                formatter: val => `${val}`,
              }}
            />
            <Tooltip
              crosshairs={{
                type: 'y',
              }}
            />
            <Geom
              type="line"
              position="month*binance"
              size={2}
              color={'binance'}
              shape={'smooth'}
            />
            <Geom
              type="point"
              position="month*binance"
              size={4}
              shape={'circle'}
              color={'binance'}
              style={{
                stroke: '#fff',
                lineWidth: 1,
              }}
            />
          </Chart>
        ) : (
          <div>本年度暂无数据</div>
        )}
      </div>
    );
  }
}
