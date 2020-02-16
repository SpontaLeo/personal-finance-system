import './BalanceSheetCurve.scss';

import {
  AssetAccountList,
  LiabilityAccountList,
} from '../../../../common/constants/Liabilities';
import { Axis, Chart, Geom, Legend, Tooltip } from 'bizcharts';
import { inject, observer } from 'mobx-react';

import { AccountItem } from '../../../../common/constants/Liabilities';
import { IconFont } from '../../../../common/components/icon-font/index';
import LiabilitiesModel from '../../../../models/LiabilitiesModal';
import LiabilitiesStore from '../../../../stores/LiabilitiesStore';
import { Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import React from 'react';
import { SelectValue } from 'antd/lib/select';
import YearSelect from '../../../../common/components/year-select/YearSelect';
import moment from 'moment';

const RadioGroup = Radio.Group;
const Button = Radio.Button;

interface BalanceSheetCurveProps {
  liabilitiesStore?: LiabilitiesStore;
}

interface BalanceSheetCurveState {
  // 每年/历年
  mode: 'annual' | 'over-the-years';
  // 单个/总体
  accountMode: 'per' | 'total';
  // 资产/负债/净资产
  type: 'asset' | 'liability' | 'net-asset';
  selectedYear: string;
}

const cols = {
  month: {
    range: [0, 1],
  },
};

@inject('liabilitiesStore')
@observer
export default class BalanceSheetCurve extends React.Component<
  BalanceSheetCurveProps,
  BalanceSheetCurveState
> {
  constructor(props: BalanceSheetCurveProps) {
    super(props);
    this.state = {
      mode: 'annual',
      accountMode: 'per',
      type: 'asset',
      selectedYear: props.liabilitiesStore!.selectedDate.format('YYYY'),
    };
  }

  private chartData() {
    const { liabilitiesData } = this.props.liabilitiesStore!;
    const { mode, accountMode, type, selectedYear } = this.state;

    let data: any[] = [];
    if (mode === 'annual') {
      const matchedYearData = liabilitiesData[selectedYear];
      if (matchedYearData) {
        Object.keys(matchedYearData).forEach((month: string) => {
          const monthData: LiabilitiesModel = matchedYearData[month];
          if (accountMode === 'per') {
            // 单个账户模式下，只能选择资产和负债，不能选择净资产
            if (type === 'asset') {
              AssetAccountList.forEach((assetAccount: AccountItem) => {
                data.push({
                  key: month,
                  amount: (monthData as any)[assetAccount.key],
                  name: assetAccount.title,
                });
              });
            } else if (type === 'liability') {
              LiabilityAccountList.forEach((liabilityAccount: AccountItem) => {
                data.push({
                  key: month,
                  amount: (monthData as any)[liabilityAccount.key],
                  name: liabilityAccount.title,
                });
              });
            }
          } else {
            if (type === 'asset') {
              data.push({
                key: month,
                amount: monthData.totalAssets,
                name: '总资产',
              });
            } else if (type === 'liability') {
              data.push({
                key: month,
                amount: monthData.totalLiabilities,
                name: '总负债',
              });
            } else {
              data.push({
                key: month,
                amount: monthData.totalAssets - monthData.totalLiabilities,
                name: '总净资产',
              });
            }
          }
        });
      }
    } else {
      Object.keys(liabilitiesData).forEach(year => {
        const matchedYearData = liabilitiesData[year];
        const lastMonthData = matchedYearData['12'];
        // 如果该年12月份有数据则绘制
        if (lastMonthData) {
          if (accountMode === 'per') {
            if (type === 'asset') {
              AssetAccountList.forEach((assetAccount: AccountItem) => {
                data.push({
                  key: year,
                  amount: (lastMonthData as any)[assetAccount.key],
                  name: assetAccount.title,
                });
              });
            } else if (type === 'liability') {
              LiabilityAccountList.forEach((liabilityAccount: AccountItem) => {
                data.push({
                  key: year,
                  amount: (lastMonthData as any)[liabilityAccount.key],
                  name: liabilityAccount.title,
                });
              });
            }
          } else {
            if (type === 'asset') {
              data.push({
                key: year,
                amount: lastMonthData.totalAssets,
                name: '总资产',
              });
            } else if (type === 'liability') {
              data.push({
                key: year,
                amount: lastMonthData.totalLiabilities,
                name: '总负债',
              });
            } else {
              data.push({
                key: year,
                amount:
                  lastMonthData.totalAssets - lastMonthData.totalLiabilities,
                name: '总净资产',
              });
            }
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

  changeType = (e: RadioChangeEvent) => {
    this.setState({
      type: e.target.value as 'asset' | 'liability' | 'net-asset',
    });
  };

  render() {
    const { mode, accountMode, type, selectedYear } = this.state;

    return (
      <div className="balance-sheet-curve">
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
            <Button value="per" disabled={type === 'net-asset'}>
              单个
            </Button>
            <Button value="total">总体</Button>
          </RadioGroup>
          <RadioGroup
            onChange={this.changeType}
            defaultValue={type}
            buttonStyle="solid"
          >
            <Button value="asset">资产</Button>
            <Button value="liability">负债</Button>
            <Button value="net-asset" disabled={accountMode === 'per'}>
              净资产
            </Button>
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
              formatter: val => `¥ ${val}`,
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
