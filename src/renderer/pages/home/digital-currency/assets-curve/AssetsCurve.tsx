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
import moment from 'moment';

const RadioGroup = Radio.Group;
const Button = Radio.Button;

interface AssetsCurveProps {
  digitalCurrencyStore?: DigitalCurrencyStore;
}

interface AssetsCurveState {
  // 每年/历年
  mode: 'annual' | 'over-the-years';
  accountMode: 'per' | 'total';
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
      mode: 'annual',
      selectedYear: props.digitalCurrencyStore!.selectedDate.format('YYYY'),
      accountMode: 'per',
    };
  }

  private chartData() {
    const { digitalCurrencyData } = this.props.digitalCurrencyStore!;
    const { mode, accountMode, selectedYear } = this.state;

    let data: any[] = [];
    if (mode === 'annual') {
      const matchedYearData = digitalCurrencyData[selectedYear];
      if (matchedYearData) {
        Object.keys(matchedYearData).forEach((month: string) => {
          const monthData: DigitalCurrencyModel = matchedYearData[month];
          if (accountMode === 'per') {
            DigitalCurrencyAccountList.forEach((account: string) => {
              data.push({
                key: month,
                amount: (monthData as any)[account],
                name: account,
              });
            });
          } else {
            data.push({
              key: month,
              amount: monthData.total,
              name: 'total',
            });
          }
        });
      }
    } else {
      Object.keys(digitalCurrencyData).forEach(year => {
        const matchedYearData = digitalCurrencyData[year];
        const lastMonthData = matchedYearData['12'];
        // 如果该年12月份有数据则绘制
        if (lastMonthData) {
          if (accountMode === 'per') {
            DigitalCurrencyAccountList.forEach((account: string) => {
              data.push({
                key: year,
                amount: (lastMonthData as any)[account],
                name: account,
              });
            });
          } else {
            data.push({
              key: year,
              amount: lastMonthData.total,
              name: 'total',
            });
          }
        }
      });
    }

    data.sort((prev, cur) => {
      const prevKey = prev.key;
      const curKey = cur.key;
      if (moment(prevKey).isBefore(moment(curKey))) {
        return -1;
      } else {
        return 1;
      }
    });
    return data;
  }

  changeSelectedYear = (year: SelectValue) => {
    this.setState({
      selectedYear: year as string,
    });
  };

  changeAccountMode = (e: RadioChangeEvent) => {
    this.setState({
      accountMode: e.target.value as 'per' | 'total',
    });
  };

  changeMode = (e: RadioChangeEvent) => {
    this.setState({
      mode: e.target.value as 'annual' | 'over-the-years',
    });
  };

  render() {
    const { mode, accountMode, selectedYear } = this.state;

    return (
      <div className="assets-curve">
        <div className="selector-container">
          <YearSelect
            style={{ width: 80 }}
            suffixIcon={<IconFont type="icon-year" />}
            defaultValue={selectedYear}
            startYear={2020}
            endYear={moment().year()}
            onChange={this.changeSelectedYear}
          />
          <RadioGroup
            onChange={this.changeAccountMode}
            defaultValue={accountMode}
            buttonStyle="solid"
          >
            <Button value="per">各个账户资产</Button>
            <Button value="total">总资产</Button>
          </RadioGroup>
          <RadioGroup
            onChange={this.changeMode}
            defaultValue={mode}
            buttonStyle="solid"
          >
            <Button value="annual">每年</Button>
            <Button value="over-the-years">历年</Button>
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
          <Axis name="key" />
          <Axis
            name="amount"
            label={{
              formatter: val => `$ ${val}`,
            }}
          />
          <Tooltip
            crosshairs={{
              type: 'cross',
            }}
          />
          <Geom
            type="line"
            position="key*amount"
            shape={'smooth'}
            size={2}
            color={'name'}
          />
          <Geom
            type="point"
            position="key*amount"
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
