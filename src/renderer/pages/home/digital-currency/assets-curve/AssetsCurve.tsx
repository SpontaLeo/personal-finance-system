import './AssetsCurve.scss';

import { Axis, Chart, Geom, Legend, Tooltip } from 'bizcharts';
import { inject, observer } from 'mobx-react';

import { DigitalCurrencyAccountList } from '../../../../common/constants/DigitalCurrency';
import DigitalCurrencyModel from '../../../../models/DigitalCurrencyModel';
import DigitalCurrencyStore from '../../../../stores/DigitalCurrencyStore';
import { IconFont } from '../../../../common/components/icon-font/index';
import { Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import React from 'react';
import { SelectValue } from 'antd/lib/select';
import YearSelect from '../../../../common/components/year-select/YearSelect';

const RadioGroup = Radio.Group;
const Button = Radio.Button;

interface AssetsCurveProps {
  digitalCurrencyStore?: DigitalCurrencyStore;
}

interface AssetsCurveState {
  mode: 'per' | 'total';
  selectedYear: string;
}

const cols = {
  month: {
    range: [0, 1],
  },
};

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
      mode: 'per',
    };
  }

  private chartData() {
    const { digitalCurrencyData } = this.props.digitalCurrencyStore!;
    const { selectedYear, mode } = this.state;

    let data: any[] = [];
    const matchedYearData = digitalCurrencyData[selectedYear];
    if (matchedYearData) {
      Object.keys(matchedYearData).forEach((key: string) => {
        const monthData: DigitalCurrencyModel = matchedYearData[key];
        if (mode === 'per') {
          DigitalCurrencyAccountList.forEach((account: string) => {
            data.push({
              month: key,
              amount: (monthData as any)[account],
              name: account,
            });
          });
        } else {
          data.push({
            month: key,
            amount: monthData.total,
            name: 'total',
          });
        }
      });
    }

    return data;
  }

  changeSelectedYear = (year: SelectValue) => {
    this.setState({
      selectedYear: year as string,
    });
  };

  changeMode = (e: RadioChangeEvent) => {
    this.setState({
      mode: e.target.value as 'per' | 'total',
    });
  };

  render() {
    const { mode, selectedYear } = this.state;

    return (
      <div className="assets-curve">
        <div className="selector-container">
          <YearSelect
            style={{ width: 80 }}
            suffixIcon={<IconFont type="icon-year" />}
            defaultValue={selectedYear}
            startYear={2020}
            endYear={2099}
            onChange={this.changeSelectedYear}
          />
          <RadioGroup
            onChange={this.changeMode}
            defaultValue={mode}
            buttonStyle="solid"
          >
            <Button value="per">各个账户资产</Button>
            <Button value="total">总资产</Button>
          </RadioGroup>
        </div>
        <Chart
          placeholder
          height={500}
          data={this.chartData()}
          padding="auto"
          scale={cols}
          forceFit
        >
          <Legend position="top" />
          <Axis name="month" />
          <Axis
            name="amount"
            label={{
              formatter: val => `$ ${val}`,
            }}
          />
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom
            type="line"
            position="month*amount"
            shape={'smooth'}
            size={2}
            color={'name'}
          />
          <Geom
            type="point"
            position="month*amount"
            size={4}
            shape={'circle'}
            color={'name'}
            style={{
              stroke: '#fff',
              lineWidth: 1,
            }}
          />
        </Chart>
      </div>
    );
  }
}
